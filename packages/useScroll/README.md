# @dh-react-hooks/use-scroll

[![NPM version](https://img.shields.io/npm/v/@dh-react-hooks/use-scroll.svg)](https://www.npmjs.com/package/@dh-react-hooks/use-scroll)
[![codecov](https://codecov.io/gh/danhuang1202/DrHooks/branch/master/graph/badge.svg)](https://codecov.io/gh/danhuang1202/DrHooks)

react hooks for getting scroll position

## Installation
```
npm i @dh-react-hooks/use-scroll
```

## Arguments
| props | type | required | default | description |
| --- | --- | --- | --- | --- |

## Way to Ride
- Common jS
```js
const useScroll = require('@dh-react-hooks/use-scroll')

  const {x, y} = useScroll.default()
```

- ESM
```js
import useScroll from '@dh-react-hooks/use-scroll'
  
  const {x, y} = useScroll()
```
