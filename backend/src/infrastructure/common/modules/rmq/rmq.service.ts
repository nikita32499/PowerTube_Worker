import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices'
import * as amqp from 'amqplib'
import { Config } from 'infrastructure/config/config'
import { z } from 'zod'

@Injectable()
export class RmqService implements OnModuleDestroy, OnModuleInit {
	private connection!: amqp.Connection
	private channel!: amqp.Channel
	onModuleInit() {
		this.initialize()
	}
	constructor() { }


	getOptions(queueName: string, noAck = false): RmqOptions {
		return {
			transport: Transport.RMQ,
			options: {
				urls: [Config.RABBIT_MQ_URI],
				queue: queueName,
				noAck,
				persistent: true,
			},
		}
	}

	ack(context: RmqContext) {
		const channel = context.getChannelRef()
		const originalMessage = context.getMessage()
		channel.ack(originalMessage)
	}

	private async initialize() {
		this.connection = await amqp.connect(Config.RABBIT_MQ_URI)
		this.channel = await this.connection.createChannel()
	}


	async sendMessage(queueName: string, data: SerializableObject, routingKey: string) {
		await this.channel.assertQueue(queueName, {
			durable: true,
		})

		this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
			persistent: true,

			headers: {
				'routing-key': routingKey,
			},
		})

		console.log(`Message sent to queue ${queueName} with routing key ${routingKey}`)
	}

	async sendMessageAndReply<S extends z.ZodSchema>({
		queueName, replyQueueName, data, schema,
		routingKey = undefined,
		timeout_sec = 30,
		pattern = undefined,
	}: {
		queueName: string,
		replyQueueName: string,
		data: SerializableObject,
		schema: S,
		routingKey?: string | undefined,
		pattern?: string | undefined,
		timeout_sec?: number,
	}): Promise<z.infer<S>> {



		await this.channel.assertQueue(queueName, {
			durable: true,
		})

		const { queue: replyQueue } = await this.channel.assertQueue(replyQueueName, { exclusive: true })

		const correlationId = Math.random().toString() + Date.now()


		this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
			persistent: true,
			replyTo: replyQueue,
			correlationId,
			headers: {
				'routing-key': routingKey,
				pattern: pattern,
			},
		})

		console.log(`Message sent to queue ${queueName} with routing key ${routingKey}`)



		return new Promise((resolve, reject) => {
			const timeout = setTimeout(() => {
				this.channel.deleteQueue(replyQueue)
				reject(new Error('Response timeout'))
			}, timeout_sec * 1000)

			this.channel.consume(replyQueue, (msg) => {
				if (msg?.properties.correlationId === correlationId) {
					clearTimeout(timeout)
					this.channel.deleteQueue(replyQueue)

					resolve(schema.parse(JSON.parse(msg.content.toString())))
				}
			}, { noAck: true })
		})
	}




	async onModuleDestroy() {
		await this.channel.close()
		await this.connection.close()
	}
}