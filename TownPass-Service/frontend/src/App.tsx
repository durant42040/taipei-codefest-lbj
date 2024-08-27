import { useEffect, useState } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [monster, setMonster] = useState({ name: '', health: 0, ugly: true });

  const client = axios.create({
    baseURL: 'http://localhost:4000',
  });

  useEffect(() => {
    client.get('/api/monster').then((response) => {
      const {data: monster} = response;
      setMonster(monster);
    })
  });

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
      <h1 className="text-3xl font-bold underline">
        {`Hello ${monster.name}!`}
      </h1>
    </>
  )
}

export default App
