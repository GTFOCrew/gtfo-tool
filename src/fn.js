// util functions

import { DateTime } from 'luxon'

const START = 9 * 60
const END = 17 * 60
const DAY = END - START
const WEEK = DAY * 5
const DOLLAR = 14

const clamp = (n, min, max) => (n < min ? min : n > max ? max : n)

export const londonNow = () => DateTime.local().setZone('Europe/London')

const minutesToday = () => {
  const now = londonNow()
  return now.hour * 60 + now.minute - START
}

// exported //

export const format = (n) => parseFloat(n.toFixed(2))

export const getDayProgress = () => format((minutesToday() / DAY) * 100)

export const getWeekProgress = () =>
  format(
    ((DAY * (londonNow().weekday - 1) + clamp(minutesToday(), -1, DAY)) /
      WEEK) *
      100,
  )

export const getMoneyProgress = () => {
  const now = londonNow()
  let dollarDay = DOLLAR
  let next = DateTime.fromObject(
    {
      day: DOLLAR,
      hour: 0,
      minute: 0,
      second: 0,
    },
    {
      zone: 'Europe/London',
    },
  )

  if (next.weekday >= 6) {
    const daysToGoBack = next.weekday - 5
    dollarDay -= next.weekday - 5
    next = next.plus({ day: -daysToGoBack })
  }

  if (now.day > dollarDay) {
    next = next.plus({ month: 1 })
  }

  return [next, next.minus({ month: 1 })]
}

export const getProgressCSS = (percent) => `${clamp(100 - percent, 0, 100)}%`
