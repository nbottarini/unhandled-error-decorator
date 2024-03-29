import { methodProxy } from './methodProxy'

export type ErrorHandler = (e: Error) => void

export function unhandledErrorDecorator<T>(obj: T, onUnhandledError: ErrorHandler): T {
    const getMethod = (method) => {
        return new Proxy(method, {
            apply: (target, thisArg, argumentsList) => {
                try {
                    const result = target.apply(obj, argumentsList)
                    if (result instanceof Promise) return result.catch(e => onUnhandledError(e))
                    return result
                } catch (e) {
                    onUnhandledError(e)
                }
            },
        })
    }
    return methodProxy(obj, getMethod)
}
