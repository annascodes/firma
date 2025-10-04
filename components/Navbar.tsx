import React from 'react'
import NavLinks from './NavLinks'
import SideDrawer from './SideDrawer'
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start ">
                     
                    <div className='flex md:hidden'>
                        <SideDrawer/>
                    </div>
                    <Link href={'/'} className="btn btn-neutral btn-outline border-none text-xl font-semibold ">Firma</Link>
                </div>
                <div className="navbar-center hidden md:flex">
                    <ul className="menu menu-horizontal px-1">
                         
                        <NavLinks/>
                    </ul>
                    
                </div>
                <div className="navbar-end  flex justify-end gap-2 items-center">

                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                    <SignedOut>
                        <SignUpButton>
                            <button className='btn btn-outline btn-xs'>Sign up</button>
                        </SignUpButton>
                        <SignInButton>
                             <button className='btn btn-neutral btn-xs'>Sign in</button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </div>

        </div>
    )
}

export default Navbar
