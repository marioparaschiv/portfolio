/// <reference types='vite/client' />
import '@total-typescript/ts-reset';

declare global {
	type ArrayToTuple<T extends ReadonlyArray<any>> = keyof {
		[K in (T extends ReadonlyArray<infer U> ? U : never)]: T[K]
	};
}