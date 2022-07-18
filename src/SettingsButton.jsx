import { useCallback, useState } from 'react'
import useSettings from './store'

const styles = {
  container: `
    flex flex-row items-center
    mt2
    white
  `,

  settingsButton: `
    bg-mid-gray
    ph2 pv1
    bn br-pill
    shadow-1
    cursor-pointer sel-none
    grow
  `,
  settingsIcon: `
    dib
    white
  `,

  settingsPill: `
    bg-mid-gray
    ph2 pv1 ml2
    bn br-pill
    shadow-1
    sel-none
  `,

  input: `
    bn br2
    f6
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
          <span className={styles.settingsIcon} style={{ width: 20 }}>
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
          className={styles.settingsIcon}
          style={{ width: 20, marginLeft: -3 }}>
          ⚙️
        </span>
      </button>
    </div>
  )
}

export default SettingsButton
