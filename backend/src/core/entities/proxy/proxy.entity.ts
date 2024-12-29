
import { ProxyCredentials } from 'powertube-shared'








export class ProxyEntityData implements Pick<ProxyCredentials, 'login' | "password" | "avail"> {

    login: string
    password: string
    avail: boolean
    createdAt: Date
    constructor(data: ProxyEntityData) {
        this.login = data.login
        this.password = data.password
        this.avail = data.avail
        this.createdAt = data.createdAt
    }


}


export class ProxyEntity extends ProxyEntityData {
    id: string
    constructor(data: ProxyEntity) {
        super(data)
        this.id = data.id
    }
}