import { useState, useEffect } from 'react'
import { format, register } from 'timeago.js'

/** start date, could be Date instance, timestamp or date string */
export type DateTime = Date | number | string

export type Options = {
  /**
   *  locale
   *  @default en_US
   * */
  locale?: string
  /** custom local register function */
  localeRegister?: (
    number: number,
    index: number,
    totalSecoends?: number
  ) => string[]
  /**
   *  update interval duration in milliseconds
   *  @default 1000
   * */
  interval?: number
}

/** timeago string */
export type TimeAgo = string

const defaultOptions = {
  locale: 'en_US',
  interval: 1000
}

const useTimeAgo = (dateTime: DateTime, options?: Options): TimeAgo => {
  const [timeago, setTimeago] = useState(null)

  const { locale, localeRegister, interval } = { ...defaultOptions, ...options }
  const updateTimeAge = () => {
    setTimeago(format(dateTime, locale))
  }

  useEffect(() => {
    if (localeRegister) {
      register(locale, localeRegister)
    }
    updateTimeAge()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const intervalId = setInterval(updateTimeAge, interval)
    return () => {
      clearInterval(intervalId)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateTime, interval])

  return timeago
}

export default useTimeAgo
