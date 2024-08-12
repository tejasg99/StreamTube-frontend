import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center bg-slate-900 text-white h-14'>
        <div className='logo p-2'>
            <h2>StreamTube</h2>
        </div>
        <div className='flex justify-between items-center gap-1 p-2'>
            <input type="search" name="searchBar" id="searchBar" className='border rounded-lg bg-slate-100 text-black pt-[2px] w-52'/>
            <label htmlFor="searchBar">search</label>
        </div>

    </div>
  )
}

export default Navbar
