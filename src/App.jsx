import { useState } from 'react'
import Hero from '@sections/Hero.jsx'
import Cursor from '@components/Cursor.jsx'
import Header from '@sections/Header.jsx'
import NavBar from '@components/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <NavBar/>
      <Cursor/>
      <Hero/>

      <div className=" min-h-[300vh]" ></div>
    </>
  )
}

export default App
