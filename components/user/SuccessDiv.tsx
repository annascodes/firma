import BasicIcons from 'components/BasicIcons'
import React from 'react'


const SuccessDiv = ({ message = 'Operation done.' }: { message: string }) => {
    return (
        <div>
            <div role="alert" className="alert alert-success bg-green-200 text-green-500 border-green-200">
               <BasicIcons label={'DONE'} />
                <span> <span className='font-semibold'>DONE !</span> <br /> {message}</span>
            </div>

        </div>
    )
}

export default SuccessDiv
