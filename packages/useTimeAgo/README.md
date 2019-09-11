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
const useTimeAgo = require('@dh-react-hooks/use-timeago')

  const timeago = useTimeAgo.default(
    Date.now(), 
    {
      interval: 30000
    }
  )
```

- ESM
```js
import useTimeAgo from '@dh-react-hooks/use-timeago'
  
  const timeago = useTimeAgo(
    Date.now(), 
    {
      interval: 30000
    }
  )
```

- Custom Local

```js
import useTimeAgo from '@dh-react-hooks/use-timeago'

  const localeRegister: function(number, index) {
    return [
      ['剛剛', '片刻後'],
      ['%s 秒前', '%s 秒後'],
      ['1 分鐘前', '1 分鐘後'],
      ['%s 分鐘前', '%s 分鐘後'],
      ['1 小時前', '1 小時後'],
      ['%s 小時前', '%s 小時後'],
      ['1 天前', '1 天後'],
      ['%s 天前', '%s 天後'],
      ['1 週前', '1 週後'],
      ['%s 週前', '%s 週後'],
      ['1 個月前', '1 個月後'],
      ['%s 個月前', '%s 個月後'],
      ['1 年前', '1 年後'],
      ['%s 年前', '%s 年後']
    ][index]
  }

  const timeago = useTimeAgo(
    Date.now(), 
    {
      locale: 'zh_TW',
      localeRegister
    }
  )
```

## Reference
- [timeago.js](https://github.com/hustcc/timeago.js)
