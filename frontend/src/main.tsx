import React, { StrictMode } from 'react'
import ReactDOM, {createRoot} from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css'
import contextSynth from "./context/ContextSynth";
import ContextSynth from "./context/ContextSynth";
import ContextColor from "./context/ContextColor";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextSynth>
    <ContextColor>
        <App/>
    </ContextColor>
    </ContextSynth>
  </StrictMode>,
)
