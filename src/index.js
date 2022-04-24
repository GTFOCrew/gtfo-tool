import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'tachyons'
import './styles.css'
import Gtfo from './Gtfo'

const root = createRoot(document.querySelector('#root'))
root.render(
  <StrictMode>
    <Gtfo />
  </StrictMode>,
)
