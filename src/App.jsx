import { useState } from 'react'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='bg-white'>
      <Navbar />
    </div>
    </>
  )
}

export default App
