import { useEffect, useRef, useState } from 'react'

type Coord = {
  x: number
  y: number
}

const useScroll = (): Coord => {
  const requestId = useRef(0)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  useEffect(() => {
    const scrollHandler = () => {
      cancelAnimationFrame(requestId.current)
      requestId.current = requestAnimationFrame(() => {
        setX(window.scrollX || document.documentElement.scrollLeft)
        setY(window.scrollY || document.documentElement.scrollTop)
      })
    }

    window.addEventListener('scroll', scrollHandler)

    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return { x, y }
}

export default useScroll
