import { TProxyCredentials } from './proxy.entity'

export type TAuthCreate = {
    Request: Pick<TProxyCredentials, 'userId'>
    Entity: Omit<TProxyCredentials, 'id' | 'createdAt' | 'avail'>
    Response: TProxyCredentials
}

export type TAuthGet = {
    Request: Pick<TProxyCredentials, 'userId'>
    Response: TProxyCredentials
}
