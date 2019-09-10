import React from 'react'
import useRaf from '@src/index.ts'
import { render } from '@testing-library/react'

const callback = jest.fn()
const Test = ({}) => {
  const {isActive} = useRaf({disable: true, callback})

  return (
    <div data-testid="test">{`${isActive}`}</div>
  )
}

describe('useRaf', () => {
  it('isActive should update after call start() and stop()', () => {
    const { getByTestId } = render(<Test />)
    expect(getByTestId('test').textContent).toBe('false')
  })
})
