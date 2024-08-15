import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { IoHomeSharp } from "react-icons/io5";

function Sidebar() {

    const listItems = [
        {
            name: "Home",
            link: "/",
            icon: <IoHomeSharp />,
            active: true,
        },
    ]
  return (
    <div className='h-[92vh] bg-slate-900'>
      <IconContext.Provider value={{ color: "white", className: "w-5 h-5" }}>
        <ul className='flex flex-col gap-1'>
            {listItems.map((item, index)=> item.active ? (
                <li key={index} className='text-slate-100 px-4 text-lg'>
                    <NavLink to={item.link} className={"flex flex-row justify-start items-center gap-4"}>
                        <span className='inline-block '>{item.icon}</span>
                        <span className='block'>{item.name}</span>
                    </NavLink>
                </li>
            ): null )}
        </ul>
      </IconContext.Provider>
    </div>
  )
}

export default Sidebar
