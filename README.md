[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Unhandled Error Decorator
Decorates an object to capture unhandled errors on each public method.
It helps centralize unhandled error handling on javascript applications. 


## Usage example

```javascript
class SampleClass {
    someSyncMethodThatFails() {
        throw new Error('Something bad happened')
    }

    async someAsyncMethodThatFails() {
        throw new Error('Something bad happened')
    }
}

const myObj = new SampleClass()
const onUnhandledError = (e) => {
    // Sample error handling
    console.error(e)
}
const decoratedObj = unhandledErrorDecorator(obj, onUnhandledError)

await decoratedObj.someAsyncMethodThatFails() // Calls onUnhandledError

decoratedObj.someSyncMethodThatFails() // Calls onUnhandledError
```
