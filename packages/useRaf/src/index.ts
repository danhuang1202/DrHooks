import { useState, useLayoutEffect, useCallback, useRef } from 'react'

type Arguments = {
  /** disable to call requestAnimationFrame at the first time */
  disable?: boolean
  /** duration time to call requestAnimationFrame in milliseconed */
  duration: number
  /** callback function to requestAnimationFrame */
  callback: (number) => void
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
  callback
}: Arguments): Result => {
  const [isActive, setIsActive] = useState(!new Boolean(disable))
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

      if (!duration || elapsedTime < duration) {
        requestId.current = requestAnimationFrame(update)
      } else {
        stop()
      }
    },
    [duration, callback]
  )

  useLayoutEffect(() => {
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
