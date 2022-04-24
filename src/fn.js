// util functions

import { DateTime } from 'luxon'

const DOLLAR = 14

const clamp = (n, min, max) => (n < min ? min : n > max ? max : n)

export const londonNow = () => DateTime.local().setZone('Europe/London')

const minutesToday = ({ start }) => {
  const now = londonNow()
  return now.hour * 60 + now.minute - start * 60 + now.second / 60
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

export const getDay = ({ start, end }) => end * 60 - start * 60

export const getWeek = (workingHours) => getDay(workingHours) * 5

export const getDayProgress = (workingHours) =>
  londonNow().weekday < 6
    ? format((minutesToday(workingHours) / getDay(workingHours)) * 100)
    : 100

export const getWeekProgress = (workingHours) =>
  format(
    ((getDay(workingHours) * (londonNow().weekday - 1) +
      clamp(minutesToday(workingHours), -1, getDay(workingHours))) /
      getWeek(workingHours)) *
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

const magicMonths = [1, 4, 7, 10]
export const getMagicProgress = () => {
  const now = londonNow()
  let nowAltered
  const nextMonth = magicMonths.find((m) => now.month <= m)
  if (nextMonth == null) {
    nowAltered = now
      .plus({ year: 1 })
      .set({ month: magicMonths[0], day: DOLLAR })
  } else {
    nowAltered = now.set({ month: nextMonth, day: DOLLAR })
  }
  const current = getPayDayForMonth(nowAltered)

  if (now.month === current.month && now.day > current.day + 2) {
    const next = getPayDayForMonth(nowAltered.plus({ months: 3 }))
    return [next, current.plus({ day: 3 })]
  }

  const prev = getPayDayForMonth(nowAltered.minus({ month: 3 }))
  return [current, prev]
}

export const getProgressCSS = (percent) => `${clamp(100 - percent, 0, 100)}%`
