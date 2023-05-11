export function methodProxy<T>(obj: T, getMethod): T {
    const handler = {
        // eslint-disable-next-line no-unused-vars
        get: (target, prop, receiver) => {
            if (typeof target[prop] === 'function') return getMethod(target[prop])
            return target[prop]
        },
    }
    return new Proxy(obj, handler)
}
