'use client'
import React from 'react'
import ImgSlider from './ImgSlider'
import { SignedIn, SignedOut, SignInButton, SignUpButton, useUser } from '@clerk/nextjs'
import { Illustrations } from 'lib/hardData'

const Hero = () => {
    const { user } = useUser()
    return (
        <div 
        // className="md:h-[640px]  flex md:flex-row flex-col gap2 items-center md:rounded-3xl rounded-xl mb-5 justify-between p-2 bg-[url('https://images.unsplash.com/photo-1710162734135-8dc148f53abe?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1032')] bg-cover bg-no-repeat " 
        className="md:h-[640px]  flex md:flex-row flex-col gap2 items-center md:rounded-3xl rounded-xl mb-5 justify-between p-2  " 
        >

            <div
                // className='md:w-sm border-0 border-black rounded-2xl p-5 flex flex-col items-start gap-2 '
                className='md:w-6/12 border-0 px-5'
            >
                <h1 className='text-6xl font-extrabold'>Firma <span className='text-base font-medium'>(web app)</span> </h1>
                <p className='md:w-xl'>A place where you can manage your company as well as interact with other companies by making request.</p>
                <div className='flex flex-wrap items-center gap-2 mt-2'>
                    {/* {
                        user
                            ?
                            <>
                                <button className='btn btn-neutral '>My Companies</button>
                                <button className='btn btn-neutral btn-outline' >Employeed</button>
                            </>
                            : <>
                                <button className='btn btn-neutral '>Get yourself register</button>
                                <button className='btn btn-neutral btn-outline' >Log in</button>
                            </>
                    } */}

                    <SignedIn>
                        
                            <button className='btn btn-neutral '>My Companies</button>
                            <button className='btn btn-neutral btn-outline' >Employeed</button>
                        
                    </SignedIn>

                    <SignedOut>
                        <SignUpButton>
                            <button className='btn btn-neutral '>Get youself register</button>
                        </SignUpButton>
                        <SignInButton>
                            <button className='btn btn-neutral btn-outline'>Sign in</button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </div>

            <div
                //  className='md:w-sm '
                className='md:w-6/12 flex   mt-5 md:mt-0  border-0 '
            >

                <div className=' overflow-hidden '>
                    <img src={Illustrations[1]} 
                    className='w-full h-full object-cover'
                    alt="" />
                </div>
                 
                {/* <ImgSlider />
                <h1 className='text-center italic tracking-widest opacity-60 animate-bounce'>swipe</h1> */}
            </div>

        </div>
    )
}

export default Hero


/* 


 <SignedOut>
                    <SignUpButton>
                        <button className='btn btn-outline btn-xs'>Sign up</button>
                    </SignUpButton>
                    <SignInButton>
                        <button className='btn btn-neutral btn-xs'>Sign in</button>
                    </SignInButton>
                </SignedOut>
*/