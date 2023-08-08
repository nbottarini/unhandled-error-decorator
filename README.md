[![npm](https://img.shields.io/npm/v/@nbottarini/unhandled-error-decorator.svg)](https://www.npmjs.com/package/@nbottarini/unhandled-error-decorator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI Status](https://github.com/nbottarini/unhandled-error-decorator/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/nbottarini/unhandled-error-decorator/actions)

# Unhandled Error Decorator
Decorates an object to capture unhandled errors on each public method.
It helps centralize unhandled error handling on javascript applications. 

## Installation

Npm:
```
$ npm install --save @nbottarini/unhandled-error-decoration
```

Yarn:
```
$ yarn add @nbottarini/unhandled-error-decoration
```


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
