import { useCallback, useState } from 'react'
import icon from './joderdroid-icon.png'
import JoderDroidDialog from './JoderDroidDialog.jsx'

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
    w3 h3
    contain
  `,

}

const LaunchButton = () => {

  const [showDialog, setShowDialog] = useState(false)
  const toggleShowSettings = useCallback(() => setShowDialog(true), [])

  return (
    <>
      <div className={styles.container}>
        <button className={styles.settingsButton} style={{backgroundImage: `url(${icon})`}} onClick={toggleShowSettings} />
      </div>
      {
        showDialog && (
          <JoderDroidDialog closeDialog={() => setShowDialog(false)}/>
        )
      }
    </>
  )
}

export default LaunchButton
