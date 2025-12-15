import { useCallback, useState } from 'react'
import bg from './joderdroid-icon-dark.png'
import icon from './joderdroid-icon.png'

const styles = {
  dialog: `
  fixed
  flex items-center justify-center
  z-9999
  w-100 h-100
  `,
  content: `
    bg-dark-gray pa3 br2
    w-50 h-auto
    flex flex-column items-center gap2
    mt2
    white
  `,
  backdrop: `
    fixed top-0 left-0 w-100 h-100
    bg-black-80
    z-999
  `,
  input: `
    flex flex-column items-center w-100
  `,
  output: `
    w-100 mb1 h4
  `,
  
  generateButton: `
    bg-mid-gray
    ph2 pv1
    bn
    shadow-1
    cursor-pointer sel-none
    grow
    w3 h3
    contain
  `,
}

const JoderDroidDialog = ({closeDialog}) => {

  const [showDialog, setShowDialog] = useState(false)
  const [minSize, setMinSize] = useState(280)
  const [maxSize, setMaxSize] = useState(280)
  const [output, setOutput] = useState("")
  const toggleCloseDialog = useCallback(() => closeDialog(), [closeDialog])
  const generateOutput = useCallback(() => {
    // Generate a random text saying JODER. The length of the text should be between the min and max size input values. Letters will be repeated randomly until fit the length.
    const length = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize
    let toUse = length - 5

    const jCount = Math.floor(Math.random() * toUse)
    toUse -= jCount
    const oCount = Math.floor(Math.random() * toUse)
    toUse -= oCount
    const dCount = Math.floor(Math.random() * toUse)
    toUse -= dCount
    const eCount = Math.floor(Math.random() * toUse)
    toUse -= eCount
    const rCount = toUse

    const j = 'J'.repeat(jCount + 1)
    const o = 'O'.repeat(oCount + 1)
    const d = 'D'.repeat(dCount + 1)
    const e = 'E'.repeat(eCount + 1)
    const r = 'R'.repeat(rCount + 1)

    const joderFull = j + o + d + e + r

    setOutput(joderFull)
  }, [minSize, maxSize])

  return (
    <>
      <div className={styles.backdrop} onClick={toggleCloseDialog} />
      <div className={styles.dialog}>
        <div className={styles.content} style={{ gap: '36px', backgroundImage: `url(${bg})` }}>
          <div className={styles.input}>
            <label>
              Min Size
            </label>
            <input type="number" value={minSize} onChange={e => setMinSize(e.target.valueAsNumber)} min={'JODER'.length} />
          </div>
          <div className={styles.input}>
            <label>
            Max Size
            </label>
            <input type="number" value={maxSize} onChange={e => setMaxSize(e.target.valueAsNumber)} />
          </div>
          
          <div className={styles.input}>
              <button className={styles.generateButton} style={{backgroundImage: `url(${icon})`}} onClick={generateOutput} />
          </div>
          <div className={styles.input}>
            <label className={styles.label}>
              Output
            </label>
            <textarea className={styles.output} style={{ resize: 'vertical' }} value={output} readOnly />
          </div>
        </div>
      </div>
    </>
  )
}

export default JoderDroidDialog