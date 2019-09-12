import { useEffect, useRef, useState } from 'react'

type ScrollTo = () => void

const useScrollBehavior = () => {
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    setSupported('scrollBehavior' in document.documentElement.style)
  }, [])

  return supported
}

const useScrollTo = (x: number, y: number): ScrollTo => {
  const supported = useScrollBehavior()
  const scrollTo = useRef(null)

  useEffect(() => {
    if (supported) {
      scrollTo.current = () => {
        window.scrollTo({ top: x, left: y, behavior: 'smooth' })
      }
    } else {
      scrollTo.current = () => {
        const startX = window.scrollX || document.documentElement.scrollLeft
        const startY = window.scrollY || document.documentElement.scrollTop
        const duration = 1000
        let startTime = null

        const callback = dataTime => {
          if (!startTime) {
            startTime = dataTime
          }

          const progress = (dataTime - startTime) / duration
          const nextX = startX + progress * (x - startX)
          const nextY = startY + progress * (y - startY)
          window.scrollTo(nextX, nextY)

          if (progress < 1) {
            requestAnimationFrame(callback)
          }
        }

        requestAnimationFrame(callback)
      }
    }
  }, [supported])

  return scrollTo.current
}

export default useScrollTo
