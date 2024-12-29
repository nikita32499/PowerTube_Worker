declare global {
	type PromisifyMethods<T, Key = ''> = {
		[K in keyof T]: K extends Key
		? T[K]
		: T[K] extends (...args: infer A) => infer R
		? (...args: A) => Promise<R>
		: T[K]
	}

	type P<T extends object> = {
		[K in keyof T]: T[K] extends object ? P<T[K]> : T[K]
	} & {}





	type SerializableObject = {
		[key: string]: string | number | boolean | null | SerializableObject | SerializableObject[]
	}
}

export { }
