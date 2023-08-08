import { unhandledErrorDecorator } from '../src'

it('calls unhandled error callback when a promise is rejected', async () => {
    const unhandledErrorCallback = jest.fn()
    const decoratedObj = unhandledErrorDecorator(obj, unhandledErrorCallback)

    await decoratedObj.someAsyncMethodThatFailsWith(error)

    expect(unhandledErrorCallback).toHaveBeenCalled()
    expect(unhandledErrorCallback).toHaveBeenCalledWith(error)
})

it('doesn\'t call callback when a promise is resolved', async () => {
    const unhandledErrorCallback = jest.fn()
    const decoratedObj = unhandledErrorDecorator(obj, unhandledErrorCallback)

    const returned = await decoratedObj.someAsyncMethodThatResolves(value)

    expect(unhandledErrorCallback).not.toHaveBeenCalled()
    expect(returned).toEqual(value)
})

it('calls unhandled error callback when an error is thrown', () => {
    const unhandledErrorCallback = jest.fn()
    const decoratedObj = unhandledErrorDecorator(obj, unhandledErrorCallback)

    decoratedObj.someSyncMethodThatFailsWith(error)

    expect(unhandledErrorCallback).toHaveBeenCalled()
    expect(unhandledErrorCallback).toHaveBeenCalledWith(error)
})

it('doesn\'t call callback when an error is not thrown', () => {
    const unhandledErrorCallback = jest.fn()
    const decoratedObj = unhandledErrorDecorator(obj, unhandledErrorCallback)

    const returned = decoratedObj.someSyncMethodThatReturns(value)

    expect(unhandledErrorCallback).not.toHaveBeenCalled()
    expect(returned).toEqual(value)
})

it('doesn\'t call callback when an internal error is captured', async () => {
    const unhandledErrorCallback = jest.fn()
    const decoratedObj = unhandledErrorDecorator(obj, unhandledErrorCallback)

    await decoratedObj.someMethodThatCapturesPrivateError()

    expect(unhandledErrorCallback).not.toHaveBeenCalled()
})

class SampleClass {
    someSyncMethodThatFailsWith(error) {
        throw error
    }

    someSyncMethodThatReturns(value) {
        return value
    }

    async someAsyncMethodThatFailsWith(error) {
        throw error
    }

    async someAsyncMethodThatResolves(value) {
        return value
    }

    async someMethodThatCapturesPrivateError() {
        try {
            await this.someAsyncMethodThatFailsWith(error)
            return true
        } catch (e) {
            return false
        }
    }
}

const obj = new SampleClass()
const error = new Error('Some Error')
const value = 'some value'
