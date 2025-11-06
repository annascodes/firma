'use client'
import { useUser } from '@clerk/nextjs'
import React from 'react'

const Page = () => {
  const { user } = useUser()
  return (
    <div className=''>
      <div className='opacity-55 md:text-2xl tracking-widest h-screen flex items-center justify-center '>
        <h1>  You are an employee of this company.</h1>
      </div>
    </div>
  )
}

export default Page
