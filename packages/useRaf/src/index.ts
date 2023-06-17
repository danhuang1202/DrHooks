import { useState, useEffect, useCallback, useRef } from 'react'

type Arguments = {
  /** disable to call requestAnimationFrame at the first time */
  disable?: boolean
  /** duration time to call requestAnimationFrame in milliseconed */
  duration: number
  /** callback function to requestAnimationFrame */
  callback: (number) => void
  /** run when the requestAnimationFrame ended (reach duration) */
  onFinish?: () => void
}

type Result = {
  /** indicate whether the requestAnimationFrame executing */
  isActive: boolean
  /** start function to execute requestAnimationFrame */
  start: () => void
  /** stop function to cancel requestAnimationFrame */
  stop: () => void
}

const useRequestAnimationFrame = ({
  disable = false,
  duration,
  callback,
  onFinish
}: Arguments): Result => {
  const [isActive, setIsActive] = useState(!disable)
  const startTime = useRef(null)
  const requestId = useRef(null)

  const start = () => {
    setIsActive(true)
  }

  const stop = () => {
    setIsActive(false)
  }

  const update = useCallback(
    timestamp => {
      if (!startTime.current) {
        startTime.current = timestamp
      }

      const elapsedTime = timestamp - startTime.current
      callback(elapsedTime)
      console.debug('11')
      if (!duration || elapsedTime < duration) {
        console.debug('12', { duration, elapsedTime })
        requestId.current = requestAnimationFrame(update)
      } else {
        if (typeof onFinish === 'function') {
          console.debug('13')
          onFinish()
        }
        console.debug('14')
        stop()
      }
    },
    [duration, callback]
  )

  useEffect(() => {
    if (isActive) {
      startTime.current = null
      requestId.current = requestAnimationFrame(update)

      return () => {
        cancelAnimationFrame(requestId.current)
      }
    }
  }, [isActive, update])

  return { isActive, start, stop }
}

export default useRequestAnimationFrame
