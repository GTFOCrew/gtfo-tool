// util functions

import { DateTime } from 'luxon'

const DOLLAR = 14

const MAGIC_CARD = 1

const clamp = (n, min, max) => (n < min ? min : n > max ? max : n)

export const tw = (s) => s

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

export const getMagicProgress = () => {
  const now = londonNow()
  const current = now.set({ day: MAGIC_CARD});
  
  
  if (now.day === MAGIC_CARD) {
    return [current, current.plus({ month: -1 })];
  }
  
  const next = current.plus({month: 1});
  return [next, current]
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
