import React from 'react'
import BasicIcons from './BasicIcons'

const ErrorDiv = ({ error = 'Dont know but something definatly went wrong' }: { error: string }) => {
    return (
        <div>
            <div role="alert" className="alert alert-error bg-red-200 text-red-500 border-red-200">
               <BasicIcons label={'BLOCKED'} />
                <span> <span className='font-semibold'>Error!</span> <br /> {error}</span>
            </div>

        </div>
    )
}

export default ErrorDiv
