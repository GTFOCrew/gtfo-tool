import React, { useEffect, useState } from 'react'
import {
  getDayProgress,
  getWeekProgress,
  getMoneyProgress,
  getMagicProgress,
  isEarlyFriday,
} from './fn'
import Progress from './Progress'
import SettingsButton from './SettingsButton'
import useSettings from './store'

const styles = {
  app: `
    code fw6
    sel-none
    w-100 vh-100 pa3
    bg-dark-gray bg-teams near-black
    flex flex-column items-center justify-center
  `,

  header: `
    mb4
  `,

  title: `
    ph3 pv2
    br2 link
    f5 f4-ns
    shadow-1
    bg-yellow near-black
    bg-animate hover-bg-near-black hover-yellow
  `,

  container: `
    mv2 w-100
    flex flex-column justify-center items-center
  `,
}

const WORKING_HOURS_KEY = 'workingHours'
const EARLY_FRIDAY_WORKING_HOURS_KEY = 'workingHours.earlyFriday'
const DEFAULT_WORKING_HOURS = { start: 9, end: 17 }
const DEFAULT_EARLY_FRIDAY_WORKING_HOURS = { start: 8, end: 13 }

const Gtfo = () => {
  const settings = useSettings()
  const workingHours = isEarlyFriday()
    ? settings.get(EARLY_FRIDAY_WORKING_HOURS_KEY) ||
      DEFAULT_EARLY_FRIDAY_WORKING_HOURS
    : settings.get(WORKING_HOURS_KEY) || DEFAULT_WORKING_HOURS
  const [dayPercent, setDayPercent] = useState(() =>
    getDayProgress(workingHours),
  )
  const [weekPercent, setWeekPercent] = useState(() =>
    getWeekProgress(workingHours),
  )
  const [[next15, last15], setMoneyPercent] = useState(() =>
    getMoneyProgress(workingHours),
  )
  const [[nextMagic, lastMagic], setMagicRechargePercent] = useState(() =>
    getMagicProgress(workingHours),
  )

  useEffect(() => {
    if (!settings.has(WORKING_HOURS_KEY)) {
      settings.set(WORKING_HOURS_KEY, DEFAULT_WORKING_HOURS)
    }

    if (!settings.has(EARLY_FRIDAY_WORKING_HOURS_KEY)) {
      settings.set(
        EARLY_FRIDAY_WORKING_HOURS_KEY,
        DEFAULT_EARLY_FRIDAY_WORKING_HOURS,
      )
    }
  }, [settings])

  useEffect(() => {
    const dayTimer = setInterval(
      () => setDayPercent(getDayProgress(workingHours)),
      1000,
    )
    const weekTimer = setInterval(
      () => setWeekPercent(getWeekProgress(workingHours)),
      10000,
    )
    const moneyTimer = setInterval(
      () => setMoneyPercent(getMoneyProgress(workingHours)),
      60000,
    )
    const magicTimer = setInterval(
      () => setMagicRechargePercent(getMagicProgress(workingHours)),
      60000,
    )

    return () => {
      clearInterval(dayTimer)
      clearInterval(weekTimer)
      clearInterval(moneyTimer)
      clearInterval(magicTimer)
    }
  }, [workingHours])

  return (
    <section className={styles.app}>
      <header className={styles.header}>
        <a className={styles.title} href="https://gtfo-tool.vercel.app/">
          :: gtfo tool ::
        </a>
      </header>

      <div className={styles.container}>
        <Progress
          label="day"
          percent={dayPercent}
          underMsg="take a nap... 💤"
          overMsg="GTFO ! 👋"
        />
      </div>

      <div className={styles.container}>
        <Progress
          label="week"
          percent={weekPercent}
          underMsg="stahp ! ⛔"
          overMsg="enjoy ! 🚀"
        />
      </div>

      <div className={styles.container}>
        <Progress
          label="💲💲💲"
          from={last15}
          to={next15}
          underMsg="pauper's lament... 📉"
          overMsg="gimme money ! 📈"
        />
      </div>

      <div className={styles.container}>
        <Progress
          label="🌯🥐🥓"
          from={lastMagic}
          to={nextMagic}
          underMsg=""
          overMsg="burn that card 🔥"
        />
      </div>

      <SettingsButton />
    </section>
  )
}

export default Gtfo
