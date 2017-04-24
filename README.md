# randomstring-browserify

Random string generator inspired by [node-randomstring](https://github.com/klughammer/node-randomstring) not using `require('crypto')` but `window.crypto` or `window.msCrypto` to generate cryptographically secure random value.

`window.crypto` or `window.msCrypto` are not supported by older browsers. Check compatibility: https://developer.mozilla.org/docs/Web/API/RandomSource/getRandomValues

## Installation
```shell
$ npm install randomstring-browserify
```

## Usage
```javascript
import randomstring from 'randomstring-browserify';

const val = randomstring();
console.log(val);  // u8KNs7aAw0DCOKO1MdEgVIcF2asajrdd
```

## Options
`randomstring(length, charset)`
- length: Integer (default: 32)
- charset: String (default: 'alphanumeric')
    * alphanumeric `[0-9a-zA-Z]`
    * alphabetic `[a-zA-Z]`
    * numeric `[0-9]`
    * hex `[0-9a-f]`
    * your own (specify your own character set as a string like `abcxyz`)

```javascript
const val = randomstring(16)  // length=16, charset='alphanumeric' (default)
console.log(val);  // 4BfHIF0s697EOW9Y

const val = randomstring(16, 'numeric') // length=16, charset='numeric'
console.log(val);  // 3122428966440165

const val = randomstring(8, 'abc') // length=8, customized charset 'a', 'b', and 'c'
console.log(val);  // ccbcacbc
```
