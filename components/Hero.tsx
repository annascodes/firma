import React from 'react'
import ImgSlider from './ImgSlider'

const Hero = () => {
    return (
        <div className="md:h-[640px]  flex items-center rounded-3xl mb-5 justify-around  bg-[url('https://images.unsplash.com/photo-1710162734135-8dc148f53abe?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1032')] bg-cover bg-no-repeat ">

            <div className='md:w-sm border-0 border-black rounded-2xl p-5 flex flex-col items-start gap-2 '>
                <h1 className='text-6xl font-extrabold'>Firma <span className='text-base font-medium'>(web app)</span> </h1>
                <p className=''>A place where you can manage your company as well as interact with other companies by making request.</p>
                <div className='flex flex-wrap items-center gap-2'>
                    <button className='btn btn-neutral '>Get yourself register</button>
                    <button className='btn btn-neutral btn-outline' >Log in</button>
                </div>
            </div>

            <div className='md:w-sm'>
                <ImgSlider/>
            </div>

        </div>
    )
}

export default Hero
