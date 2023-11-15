// util functions

import { DateTime } from 'luxon'

const DOLLAR = 14

const MAGIC_CARD = 7

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

const magicMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
export const getMagicProgress = () => {
  const now = londonNow()
  let nowAltered
  const nextMonth = magicMonths.find((m) => now.month <= m)
  if (nextMonth == null) {
    nowAltered = now
      .plus({ year: 1 })
      .set({ month: magicMonths[0], day: MAGIC_CARD })
  } else {
    nowAltered = now.set({ month: nextMonth, day: MAGIC_CARD })
  }
  const current = getPayDayForMonth(nowAltered).plus({
    day: MAGIC_CARD - DOLLAR,
  })

  if (now.month === current.month && now.day > current.day + 2) {
    const next = getPayDayForMonth(nowAltered.plus({ months: 1 })).plus({
      day: MAGIC_CARD - DOLLAR,
    })
    return [next, current.plus({ day: 3 + MAGIC_CARD - DOLLAR })]
  }

  const prev = getPayDayForMonth(nowAltered.minus({ month: 1 })).plus({
    day: MAGIC_CARD - DOLLAR,
  })
  return [current, prev]
}

export const getProgressCSS = (percent) => `${clamp(100 - percent, 0, 100)}%`

export const isEarlyFriday = () => {
  const now = londonNow()
  // early friday is in friday
  return (
    now.weekday === 5 &&
    // june, july and august
    ([6, 7, 8].includes(now.month) ||
      // but also the first friday of september
      (now.month === 9 && now.day <= 7))
  )
}
