import { useEffect, useState } from 'react'
import {
  getDayProgress,
  getWeekProgress,
  getMoneyProgress,
  getMagicProgress,
  isEarlyFriday,
  tw,
} from './fn'
import Progress from './Progress'
import SettingsButton from './SettingsButton'
import LaunchButton from './joderdroid/LaunchButton'
import useSettings from './store'

const styles = {
  app: tw`
    font-code font-semibold
    sel-none
    w-full h-dvh pa3
    bg-teams text-near-white
    flex flex-col items-center justify-center
  `,

  header: tw`
    mb-8
  `,

  title: tw`
    px-4 py-2
    rounded-sm
    text-base sm:text-xl
    shadow-md
    bg-yellow-400 text-near-black
    transition hover:bg-near-black hover:text-yellow-400
  `,

  container: tw`
    my-2 w-full
    flex flex-col justify-center items-center
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
      <LaunchButton />
    </section>
  )
}

export default Gtfo
