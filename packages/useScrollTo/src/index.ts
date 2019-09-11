import { useEffect, useRef, useState } from 'react'
import useRaf from '@dh-react-hooks/use-raf'

type ScrollTo = () => void

const useScrollBehavior = () => {
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    setSupported('scrollBehavior' in document.documentElement.style)
  }, [])

  return supported
}

const useScroll = (x: number, y: number) => {
  const [scrollX, setScrollX] = useState(x)
  const [scrollY, setScrollY] = useState(y)

  useEffect(() => {
    setScrollX(window.scrollX || document.documentElement.scrollLeft)
    setScrollY(window.scrollY || document.documentElement.scrollTop)
  }, [])

  return { scrollX, scrollY }
}

const useScrollTo = (x: number, y: number): ScrollTo => {
  const supported = useScrollBehavior()
  const { scrollX: startX, scrollY: startY } = useScroll(x, y)
  const scrollTo = useRef(null)
  const duration = 1000
  const callback = elapsedTime => {
    const progress = elapsedTime / duration
    const nextX = startX + progress * (x - startX)
    const nextY = startY + progress * (y - startY)
    window.scrollTo(nextX, nextY)
  }
  const { start } = useRaf({ disable: true, duration: 1000, callback })

  useEffect(() => {
    if (supported) {
      scrollTo.current = () => {
        window.scrollTo({ top: x, left: y, behavior: 'smooth' })
      }
    } else {
      scrollTo.current = () => {
        start()
      }
    }
  }, [supported])

  return scrollTo.current
}

export default useScrollTo
