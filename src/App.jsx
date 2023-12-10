import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


import HomePage from './Components/HomePage';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
      <HomePage/>

    </div>
  )
}

export default App
