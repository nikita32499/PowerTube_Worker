import { ProxyCredentials } from 'powertube-shared/dist/entities/proxy/proxy.entity'
import { ProxyEntity, ProxyEntityData } from './proxy.entity'





export interface TProxyDatabaseRepo {
    create: (proxy: ProxyEntityData) => Promise<ProxyEntity>

    getAll: () => Promise<ProxyEntity[]>

    delete: (login: string) => Promise<boolean>
}


export interface TProxyProducerRepo {

    create: (proxy: ProxyCredentials) => Promise<boolean>

    getAll: (proxyList: ProxyCredentials[]) => Promise<boolean>

    delete: (success: boolean) => Promise<boolean>
}