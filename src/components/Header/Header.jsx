import React from 'react'
import Search from './Search'

const Header = () => {
  return (
    <div className='flex justify-between items-center bg-slate-900 text-white h-14'>
        <div className='logo p-2'>
            <h2>StreamTube</h2>
        </div>
        <Search />
    </div>
  )
}

export default Header
