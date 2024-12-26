import { TProxyCredentials } from 'core/repositories/proxy/types/proxy.entity'

export class ProxyEntity implements TProxyCredentials {
    id: string
    userId: string
    username: string
    password: string
    createdAt: number
    avail: boolean

    constructor(data: TProxyCredentials) {
        this.id = data.id
        this.userId = data.userId
        this.username = data.username
        this.password = data.password
        this.createdAt = data.createdAt
        this.avail = data.avail
    }
}
