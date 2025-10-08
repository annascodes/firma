'use client'
import { useUser } from '@clerk/nextjs'
import React from 'react'

const Page = () => {
    const {user} = useUser()
  return (
    <div className=''>
     <span className='md:text-2xl tracking-widest'>
        Work you are engage within this company
        <div className='w-full overflow-auto border p-5'>
            <pre className='text-xs tracking-widest'>
            {JSON.stringify(user, null, 10)}
        </pre>
        </div>
     </span>
    </div>
  )
}

export default Page
