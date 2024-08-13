import { useState } from 'react'
import Header from './components/Header/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='min-h-screen w-screen bg-slate-800'>
     <Header />
    </div>
    </>
  )
}

export default App
