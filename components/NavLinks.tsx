import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const NavLinks = () => {
    return (
        <>

            {/* <li>
                <details>
                    <summary> Navlinks </summary>
                    <ul className="p-2  w-40">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                    </ul>
                </details>
            </li> */}
            <SignedIn>
                <li> <Link href={`/companies`}>My Companies</Link> </li>
                <li> <Link href={`/employee`}>Employed</Link> </li>
                {/* <li> <Link href={`/createcompany`}>+ Company</Link> </li>
                <li> <Link href={`/createdepartment`}>+ Department</Link> </li> */}
                <li> <Link href={`/user`}> User</Link> </li>

            </SignedIn>


            <SignedOut>
                <div className='flex flex-col  justify-start items-start gap-3'>
                    <SignUpButton>
                        <button className='btn btn-neutral btn-sm '>Get youself register</button>
                    </SignUpButton>
                    <SignInButton>
                        <button className='btn btn-neutral btn-outline btn-sm'>Sign in</button>
                    </SignInButton>
                </div>
            </SignedOut>



        </>
    )
}

export default NavLinks
