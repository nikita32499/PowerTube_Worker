import { DynamicModule, Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { Config } from 'infrastructure/config/config'
import { RmqService } from './rmq.service'

interface RmqModuleOptions {
	name: string
}

@Module({
	providers: [RmqService],
	exports: [RmqService],
})
export class RmqModule {
	static register({ name }: RmqModuleOptions): DynamicModule {
		return {
			module: RmqModule,
			imports: [
				ClientsModule.registerAsync([
					{
						name,
						useFactory: () => ({
							transport: Transport.RMQ,
							options: {
								urls: [Config.RABBIT_MQ_URI],
								queue: Config[`RABBIT_MQ_QUEUE_${name}` as keyof typeof Config] as string,
							},
						}),
					},
				]),
			],
			exports: [ClientsModule],
		}
	}
}