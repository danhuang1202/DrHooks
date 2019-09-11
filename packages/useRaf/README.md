# @dh-react-hooks/use-raf

[![NPM version](https://img.shields.io/npm/v/@dh-react-hooks/use-raf.svg)](https://www.npmjs.com/package/@dh-react-hooks/use-raf)
[![codecov](https://codecov.io/gh/danhuang1202/DrHooks/branch/master/graph/badge.svg)](https://codecov.io/gh/danhuang1202/DrHooks)

react hooks for handling `requestAnimationFrame`

## Installation
```
npm i @dh-react-hooks/use-raf
```

## Arguments
| props | type | required | default | description |
| --- | --- | --- | --- | --- |
| disable | boolean | false | false | disable to call requestAnimationFrame at the first time |
| duration | number | false | undefined | duration time to call requestAnimationFrame in milliseconed. it not specify, callback will loop infinitely |
| callback | function | true | undefined | callback function to requestAnimationFrame |

## Way to Ride
- Common jS
```js
const useRaf = require('@dh-react-hooks/use-raf')

  const { isActive, start, stop } = useRaf.default({
    disable,
    duration,
    callback
  })
```

- ESM
```js
import useRaf from '@dh-react-hooks/use-raf'
  
  const { isActive, start, stop } = useRaf({
    disable,
    duration,
    callback
  })
```
