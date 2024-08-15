import { useState } from 'react'
import { Header, Sidebar } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] '>
     <Header />
    <div className="flex">
          <div className="left w-[15%]">
            <Sidebar />
          </div>
          <div className="right w-[85%]">
            <div>
              <Outlet />
            </div>
          </div> 
        </div>
    </div>    
    </>
  )
}

export default App
