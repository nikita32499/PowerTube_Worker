// import { TProxyProducerRepo } from 'core/entities/proxy/proxy.repository'
// import { RmqService } from 'infrastructure/common/modules/rmq/rmq.service'
// import { Config } from 'infrastructure/config/config'
// import { ProxyCredentials } from 'powertube-shared'



// export class ProxyProducerImpl implements TProxyProducerRepo {

// 	constructor(private readonly rmqService: RmqService) {

// 	}

// 	async create(proxy: ProxyCredentials) {
// 		this.rmqService.sendMessage("master-proxy-queue", proxy, "master-proxy-routing-key")
// 	}

// 	async getAll(proxyList: ProxyCredentials[]) {
// 		this.rmqService.sendMessage(Config.RABBIT_MQ_QUEUE_NAME, proxyList, Config.RABBIT_MQ_ROUTING_KEY)
// 	}

// 	async delete(success: boolean) {
// 		this.rmqService.sendMessage(Config.RABBIT_MQ_QUEUE_NAME, success, Config.RABBIT_MQ_ROUTING_KEY)
// 	}

// 	delete: (success: boolean) => Promise<boolean>

// }