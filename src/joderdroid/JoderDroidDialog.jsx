import { useCallback, useState } from 'react'
import bg from './joderdroid-icon-dark.png'
import icon from './joderdroid-icon.png'
import { tw } from '../fn'

const styles = {
  dialog: tw`
    fixed
    flex items-center justify-center
    z-9999
    size-1/2
  `,
  content: tw`
    bg-near-black text-near-white
    p-4 mt-2 rounded-sm
    w-full h-auto
    flex flex-col items-center gap-9
  `,
  backdrop: tw`
    fixed top-0 left-0 w-full h-full
    bg-near-black/80 backdrop-blur-md
    z-999
  `,
  inputContainer: tw`
    flex flex-col items-center w-full
  `,
  input: tw`
    mb-1 px-1 py-0.5 rounded-sm
    bg-near-white text-near-black
  `,
  output: tw`
    w-full mb-1 h-32 px-1 py-0.5 rounded-sm
    bg-near-white text-near-black
    resize-y min-h-8 max-h-96
  `,
  
  generateButton: tw`
    px-2 py-1
    shadow hover:shadow-md active:shadow-xs
    cursor-pointer sel-none
    size-16
    bg-contain
    transition duration-200 hover:scale-105 active:scale-95
  `,
}

const JoderDroidDialog = ({closeDialog}) => {
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
        <div className={styles.content} style={{ backgroundImage: `url(${bg})` }}>
          <div className={styles.inputContainer}>
            <label htmlFor="minSize">
              Min Size
            </label>
            <input className={styles.input} type="number" id="minSize" value={minSize} onChange={e => setMinSize(e.target.valueAsNumber)} min={'JODER'.length} />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="maxSize">
              Max Size
            </label>
            <input className={styles.input} type="number" id="maxSize" value={maxSize} onChange={e => setMaxSize(e.target.valueAsNumber)} />
          </div>
          
          <div className={styles.inputContainer}>
            <button className={styles.generateButton} style={{backgroundImage: `url(${icon})`}} onClick={generateOutput} />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="output">
              Output
            </label>
            <textarea className={styles.output} value={output} readOnly id="output" />
          </div>
        </div>
      </div>
    </>
  )
}

export default JoderDroidDialog