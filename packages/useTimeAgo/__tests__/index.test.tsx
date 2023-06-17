/**
 * @jest-environment jsdom
 */
import React from 'react'
import useTimeAgo from '@src/index.ts'
import { render, cleanup } from '@testing-library/react'

const TEST_ID = 'test'
const Test = ({dateTime, options}) => {
  const timeAgo = useTimeAgo(dateTime, options)

  return (
    <div data-testid={TEST_ID}>{timeAgo}</div> 
  )
}


/*eslint-disable */
const mockDate = (now, millisecondsLater) => {
  const originDate = Date
  const mockDateAfterOneMins = new originDate(now + millisecondsLater)
  // @ts-ignore
  global.Date = class extends Date {
    // @ts-ignore
    constructor(date) {
      if (date) {
        new originDate(date)
      }

      return date ? new originDate(date) : mockDateAfterOneMins
    }
  }
}
/*eslint-enable */

describe('useTimeAgo', () => {
  afterEach(() => {
    cleanup()
  })

  it('initial timeago', () => {
    const props = {
      dateTime: Date.now()
    }

    const { getByTestId } = render(<Test {...props} />)
    expect(getByTestId(TEST_ID).textContent).toBe('just now')
  })

  it('timer update after 10 seconds', () => {
    jest.useFakeTimers()
    const dateTime = Date.now()

    const props = {
      dateTime,
      options: {
        interval: 10000
      }
    }

    const { getByTestId } = render(<Test {...props} />)

    mockDate(dateTime, 10000)
    jest.runOnlyPendingTimers()

    expect(getByTestId(TEST_ID).textContent).toBe('10 seconds ago')

    jest.useRealTimers()
  })

  it('TimeAgo with custom locale register', () => {
    const dateTime = Date.now()

    const props = {
      dateTime,
      options: {
        locale: 'zh_TW',
        localeRegister: function(number, index) {
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
      }
    }

    const { getByTestId } = render(<Test {...props} />)
    expect(getByTestId(TEST_ID).textContent).toBe('剛剛')
  })
})
