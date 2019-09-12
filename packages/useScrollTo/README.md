# @dh-react-hooks/use-scrollto

[![NPM version](https://img.shields.io/npm/v/@dh-react-hooks/use-scrollto.svg)](https://www.npmjs.com/package/@dh-react-hooks/use-scrollto)
[![codecov](https://codecov.io/gh/danhuang1202/DrHooks/branch/master/graph/badge.svg)](https://codecov.io/gh/danhuang1202/DrHooks)

reast hooks for scrollTo

## Installation
```
npm i @dh-react-hooks/use-scrollto
```

## Arguments
| props | type | required | default | description |
| --- | --- | --- | --- | --- |
| x | number | true | undefined | pixel along the horizontal axis of the document |
| y | number | true | undefined | pixel along the vertical axis of the document |

## Way to Ride
- Common jS
```js
const useScrollto = require('@dh-react-hooks/use-scrollto')

  const scrollto = useScrollto.default(x, y)
```

- ESM
```js
import useScrollto from '@dh-react-hooks/use-scrollto'
  
  const scrollto = useScrollto(x, y)
```
