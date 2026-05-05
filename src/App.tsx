import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      <h1>Bienvenido a Zensu React TS</h1>
      <p>Haz clic en el botón para ver React funcionando con TypeScript.</p>
      <button onClick={() => setCount((value) => value + 1)}>
        Cuenta: {count}
      </button>
    </div>
  )
}

export default App
