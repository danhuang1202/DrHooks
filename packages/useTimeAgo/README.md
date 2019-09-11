# @dh-react-hooks/use-raf

[![NPM version](https://img.shields.io/npm/v/@dh-react-hooks/useTimeAgo.svg)](https://www.npmjs.com/package/@dh-react-hooks/useTimeAgo)
[![codecov](https://codecov.io/gh/danhuang1202/DrHooks/branch/master/graph/badge.svg)](https://codecov.io/gh/danhuang1202/DrHooks)

react hooks for [timeago.js](https://github.com/hustcc/timeago.js)


## Installation
```
npm i @dh-react-hooks/useTimeAgo
```

## Arguments
  | props | type | required | default | description |
  | --- | --- | --- | --- | --- |
  | dateTime | Date / number / string | true | undefined | start date |
  | options | object | false | undefined | options |
  <br/>

  - Options
  
  | options | type | default | description |
  | --- | --- | --- | --- |
  | locale | string | en_US | locale |
  | localeRegister	| function | custom local register function |
  | interval | number | 1000 | update interval duration in milliseconds |

## Way to Ride
- Common jS
```js
const useTimeAgo = require('@dh-react-hooks/useTimeAgo')

  const { } = useTimeAgo.default({})
```

- ESM
```js
import useTimeAgo from '@dh-react-hooks/useTimeAgo'
  
  const {} = useRaf({})
```
