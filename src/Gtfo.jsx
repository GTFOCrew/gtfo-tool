import React, { useEffect, useState } from 'react'
import {
  getDayProgress,
  getWeekProgress,
  getMoneyProgress,
  getMagicProgress,
} from './fn'
import Progress from './Progress'

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

const Gtfo = () => {
  const [dayPercent, setDayPercent] = useState(() => getDayProgress())
  const [weekPercent, setWeekPercent] = useState(() => getWeekProgress())
  const [[next15, last15], setMoneyPercent] = useState(() => getMoneyProgress())
  const [[nextMagic, lastMagic], setMagicRechargePercent] = useState(() =>
    getMagicProgress(),
  )

  useEffect(() => {
    const dayTimer = setInterval(() => setDayPercent(getDayProgress()), 1000)
    const weekTimer = setInterval(
      () => setWeekPercent(getWeekProgress()),
      10000,
    )
    const moneyTimer = setInterval(
      () => setMoneyPercent(getMoneyProgress()),
      60000,
    )
    const magicTimer = setInterval(
      () => setMagicRechargePercent(getMagicProgress()),
      60000,
    )

    return () => {
      clearInterval(dayTimer)
      clearInterval(weekTimer)
      clearInterval(moneyTimer)
      clearInterval(magicTimer)
    }
  }, [])

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
    </section>
  )
}

export default Gtfo
