import { SignedIn } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const NavLinks = () => {
    return (
        <>

            <li>
                <details>
                    <summary> Navlinks </summary>
                    <ul className="p-2  w-40">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                    </ul>
                </details>
            </li>
            <SignedIn>
                <li> <Link href={`/mycompanies`}>Companies</Link> </li>
                <li> <Link href={`/createcompany`}>+ Company</Link> </li>
                <li> <Link href={`/createdepartment`}>+ Department</Link> </li>
                <li> <Link href={`/user`}> User</Link> </li>

            </SignedIn>
 


        </>
    )
}

export default NavLinks
