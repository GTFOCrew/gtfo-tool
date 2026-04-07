import { DateTime } from 'luxon'
import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { format, londonNow, getProgressCSS, tw } from './fn'

const styles = {
  back: tw`
    gradient shadow
    w-lg mw-90 h-16
    rounded-full cursor transition duration-300
    hover:shadow-xl hover:scale-105
    active:shadow-xs active:scale-95
  `,

  main: tw`
    w-full h-full
    progress rounded-full
    flex justify-center items-center
    transition-all
  `,

  label: tw`
    text-center text-base
    px-2 mb-2
    rounded-sm shadow-md
    bg-near-black text-near-white
  `,

  data: tw`
    px-2 py-0.5
    rounded-sm shadow-lg
    bg-near-white text-near-black
  `,
}

const Progress = ({ label = 'progress', percent = 0, from, to, underMsg = 'not started yet', overMsg = 'done ! ✨' }) => {
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

export default Progress
