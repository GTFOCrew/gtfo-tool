import { useCallback, useState } from 'react'
import icon from './joderdroid-icon.png'
import JoderDroidDialog from './JoderDroidDialog.jsx'
import { tw } from '../fn.js'

const styles = {
  container: tw`
    flex flex-row items-center
    mt-2
  `,

  settingsButton: tw`
    px-2 py-1
    rounded-full
    shadow-md hover:shadow-xl active:shadow-xs
    cursor-pointer sel-none
    size-16
    bg-center bg-contain
    transition duration-200 hover:scale-105 active:scale-90
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
