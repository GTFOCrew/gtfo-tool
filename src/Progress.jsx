import { DateTime } from 'luxon'
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { format, londonNow, getProgressCSS } from './fn'

const styles = {
  back: `
    gradient
    w6 mw-90 h3
    br-pill shadow-hover grow cursor
  `,

  main: `
    w-100 h-100
    progress br-pill
    bg-near-black near-white
    flex justify-center items-center
  `,

  label: `
    tc f5
    ph2 mb2
    br2 shadow-2
    bg-near-black near-white
  `,

  data: `
    ph2 pv1
    br2 shadow-2
    bg-near-white near-black
  `,
}

const Progress = ({ label, percent, from, to, underMsg, overMsg }) => {
  const fPercentage = useMemo(() => {
    if (from && to) {
      const diff1 = londonNow().diff(from)
      const diff2 = to.diff(from)
      return format((100 * diff1.valueOf()) / diff2.valueOf())
    }

    return format(percent)
  }, [percent, to, from])

  const message =
    fPercentage < 0
      ? underMsg
      : fPercentage >= 100
      ? overMsg
      : `${fPercentage}%`

  return (
    <>
      <div className={styles.label}>{label}</div>

      <section className={styles.back}>
        <main
          className={styles.main}
          style={{ backgroundPosition: getProgressCSS(fPercentage) }}>
          <span className={styles.data}>{message}</span>
        </main>
      </section>
    </>
  )
}

Progress.propTypes = {
  label: PropTypes.string,
  percent: PropTypes.number,
  from: PropTypes.instanceOf(DateTime),
  to: PropTypes.instanceOf(DateTime),
  underMsg: PropTypes.string,
  overMsg: PropTypes.string,
}

Progress.defaultProps = {
  label: 'progress',
  percent: 0,
  underMsg: 'not started yet',
  overMsg: 'done ! ✨',
}

export default Progress
