import { TProxyCredentials } from './types/proxy.entity'

export type TProxyRepo = {
    createProxy: (userId: string) => Promise<TProxyCredentials>
}
