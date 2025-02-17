import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>KEVAN</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          POWER LVL {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius quas totam accusamus nisi ducimus reiciendis non reprehenderit suscipit maiores veritatis? Optio voluptatibus harum veniam iusto natus quos exercitationem enim odio.
      </p>
    </>
  )
}

export default App
