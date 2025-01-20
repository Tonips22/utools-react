import { useState } from 'react'
import Hero from '@sections/Hero.jsx'
import Cursor from '@components/Cursor.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Cursor/>
      <Hero/>

      <div className=" min-h-[300vh]" ></div>
    </>
  )
}

export default App
