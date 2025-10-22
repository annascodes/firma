import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex'>
            <div className='w-2/12 bg-amber-100 p-2 rounded-lg h-svh'>
                <h1 className='text-xl'>Sidebar</h1>
            </div>
            <div className='w-10/12 p-2'>
                {children}
            </div>


        </div>
    )
}

export default layout
