import { useCallback, useState } from 'react'
import useSettings from './store'
import { tw } from './fn'

const styles = {
  container: tw`
    flex flex-row items-center
    mt-2
  `,

  settingsButton: tw`
    bg-neutral-600 hover:bg-neutral-600/75
    leading-tight
    px-2 py-1
    rounded-full
    shadow hover:shadow-md
    cursor-pointer sel-none
    transition duration-200
  `,

  settingsIcon: tw`
    inline-block size-5
    text-near-white
  `,

  settingsPill: tw`
    bg-neutral-600 text-near-white
    px-2 py-1 ml-2
    rounded-full
    shadow hover:shadow-md
    sel-none
  `,

  input: tw`
    px-0.5
    rounded-sm
    text-sm bg-near-white text-near-black
  `,
}

const SettingsButton = () => {
  const [showSettings, setShowSettings] = useState(false)
  const settings = useSettings()

  const toggleShowSettings = useCallback(() => setShowSettings((v) => !v), [])
  const changeWorkingHoursStart = useCallback(
    (ev) => settings.set('workingHours.start', parseInt(ev.target.value, 10)),
    [settings],
  )
  const changeWorkingHoursEnd = useCallback(
    (ev) => settings.set('workingHours.end', parseInt(ev.target.value, 10)),
    [settings],
  )
  const changeWorkingHoursEarlyFridayStart = useCallback(
    (ev) =>
      settings.set(
        'workingHours.earlyFriday.start',
        parseInt(ev.target.value, 10),
      ),
    [settings],
  )
  const changeWorkingHoursEarlyFridayEnd = useCallback(
    (ev) =>
      settings.set(
        'workingHours.earlyFriday.end',
        parseInt(ev.target.value, 10),
      ),
    [settings],
  )

  if (showSettings) {
    return (
      <div className={styles.container}>
        <button className={styles.settingsButton} onClick={toggleShowSettings}>
          <span className={styles.settingsIcon}>
            &times;
          </span>
        </button>
        <div className={styles.settingsPill}>
          <span role="img" aria-label="Clock Icon">
            🕙
          </span>
          &nbsp;
          <input
            type="number"
            className={styles.input}
            min={7}
            max={9}
            value={settings.workingHours.start}
            onChange={changeWorkingHoursStart}
          />
          -
          <input
            type="number"
            className={styles.input}
            min={14}
            max={17}
            value={settings.workingHours.end}
            onChange={changeWorkingHoursEnd}
          />
        </div>
        <div className={styles.settingsPill}>
          <span role="img" aria-label="Clock and Wind Icons">
            🕙💨
          </span>
          &nbsp;
          <input
            type="number"
            className={styles.input}
            min={7}
            max={9}
            value={settings.workingHours.earlyFriday.start}
            onChange={changeWorkingHoursEarlyFridayStart}
          />
          -
          <input
            type="number"
            className={styles.input}
            min={12}
            max={15}
            value={settings.workingHours.earlyFriday.end}
            onChange={changeWorkingHoursEarlyFridayEnd}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <button className={styles.settingsButton} onClick={toggleShowSettings}>
        <span
          role="img"
          aria-label="Settings Icon"
          className={styles.settingsIcon}>
          ⚙️
        </span>
      </button>
    </div>
  )
}

export default SettingsButton
