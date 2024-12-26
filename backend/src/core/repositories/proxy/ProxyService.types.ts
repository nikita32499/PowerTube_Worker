import { TProxyCredentials } from './types/proxy.entity'


export type TProxyService = {
	createProxy: (userId: string) => Promise<TProxyCredentials>

	getProxyByUserId: (userId: string) => Promise<TProxyCredentials>
}
