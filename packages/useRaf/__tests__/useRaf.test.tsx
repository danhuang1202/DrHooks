/**
 * @jest-environment jsdom
 */
import React from 'react'
import useRaf from '@src/index.ts'
import { render, fireEvent, cleanup } from '@testing-library/react'

const TEST_ID_STATUS = 'status'
const TEST_ID_START = 'start'
const TEST_ID_STOP = 'stop'

const callback = jest.fn()
const Test = ({disable = true, duration}) => {
  const {isActive, start, stop} = useRaf({disable, duration, callback})

  return (
    <div>
      <span  data-testid={TEST_ID_STATUS}>{`${isActive}`}</span>
      <span  data-testid={TEST_ID_START} onClick={start}/>
      <span  data-testid={TEST_ID_STOP} onClick={stop}/>
    </div> 
  )
}

describe('useRaf', () => {
  afterEach(() => {
    cleanup()
  })

  it('isActive should update after call start() and stop()', () => {
    const { getByTestId } = render(<Test />)
    expect(getByTestId(TEST_ID_STATUS).textContent).toBe('false')

    fireEvent.click(getByTestId(TEST_ID_START))
    expect(getByTestId(TEST_ID_STATUS).textContent).toBe('true')

    fireEvent.click(getByTestId(TEST_ID_STOP))
    expect(getByTestId(TEST_ID_STATUS).textContent).toBe('false')
  })

  it('should run requestAnimationFrame at the first place when disable is false', () => {
    const { getByTestId } = render(<Test disable={false}/>)
    expect(getByTestId(TEST_ID_STATUS).textContent).toBe('true')
  })

  it('should cancelAnimationFrame when time reach duration', () => {
    const duration = 500
    let time = Date.now()
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      time += 500
      setTimeout(() => {
        callback(time)
      }, 0);
      
      return time
    })

    jest.useFakeTimers()

    const { getByTestId } = render(<Test duration={duration}/>)
    expect(getByTestId(TEST_ID_STATUS).textContent).toBe('false')

    fireEvent.click(getByTestId(TEST_ID_START))
    expect(getByTestId(TEST_ID_STATUS).textContent).toBe('true')

    jest.advanceTimersByTime(duration + 100)
    expect(getByTestId(TEST_ID_STATUS).textContent).toBe('false')

    jest.useRealTimers()
  })
})
