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

const getPayDayForMonth = (date) => {
  let payDay = DateTime.fromObject(
    {
      day: DOLLAR,
      hour: 0,
      minute: 0,
      second: 0,

      month: date.month,
      year: date.year,
    },
    {
      zone: 'Europe/London',
    },
  )

  return payDay.minus({ days: Math.max(0, payDay.weekday - 5) })
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
  const current = getPayDayForMonth(now)

  if (now.day > current.day) {
    const next = getPayDayForMonth(now.plus({ month: 1 }))
    return [next, current.plus({ day: 1 })]
  }

  const prev = getPayDayForMonth(now.minus({ month: 1 }))
  return [current, prev]
}

export const getProgressCSS = (percent) => `${clamp(100 - percent, 0, 100)}%`
