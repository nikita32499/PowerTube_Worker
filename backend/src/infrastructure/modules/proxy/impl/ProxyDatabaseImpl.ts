import { InjectRepository } from '@nestjs/typeorm'
import { ProxyEntity, ProxyEntityData } from 'core/entities/proxy/proxy.entity'
import { TProxyDatabaseRepo } from 'core/entities/proxy/proxy.repository'
import { Repository } from 'typeorm'
import { ProxyDB } from '../db/proxy.db'



export class ProxyDatabaseImpl implements TProxyDatabaseRepo {


	constructor(@InjectRepository(ProxyDB) private readonly proxyDB: Repository<ProxyDB>) {
	}

	async getAll(): Promise<ProxyEntity[]> {
		return await this.proxyDB.find()
	}

	async create(proxy: ProxyEntityData): Promise<ProxyEntity> {
		const newProxy = await this.proxyDB.save(proxy)
		return new ProxyEntity(newProxy)
	}

	async delete(id: string): Promise<boolean> {
		await this.proxyDB.delete(id)
		return true
	}
}
