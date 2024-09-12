import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <header>
      <img className="backImage" src="src\assets\HomePageBackground.png" alt="" />
      <div className="headingText">
        <h1>Where do you want to go?</h1>
        <p>Trips, experiences, and places. All in one service.</p>
        <div className="searchBar">

        </div>
      </div>
    </header>
    </>
  )
}

export default App
