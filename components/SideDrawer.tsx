import React from 'react'
import NavLinks from './NavLinks'
import { RiMenu4Line } from "react-icons/ri";


const SideDrawer = () => {
    return (
        <div className=' bg-white'>
            <div className="drawer  ">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" className="btn btn-ghost btn-xs">
                        <RiMenu4Line className='text-xl' />
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        {/* <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li> */}
                        <div>
                            <h1 className='text-6xl font-extrabold '>Firma</h1>
                        </div>
                        <NavLinks/>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default SideDrawer
