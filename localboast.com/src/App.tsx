import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useQuickySticky from "./tmp_laptop_folder/useQuickySticky"

function App() {
  const [count, setCount] = useState(0)
  const stickyStyle = useQuickySticky()

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/></p>
      <a href="https://react.dev" target="_blank" style={stickyStyle}>
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <p>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/>cicgricgeic<br/><br/></p>

    </>
  )
}

export default App
