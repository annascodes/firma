'use client'
import { SignUp } from '@clerk/nextjs'
import React from 'react'

type PropType ={
    companyId: string
}
const AddUser = ({companyId}:PropType) => {
    const modalId = `${companyId}-adduser`
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn" onClick={() =>{
                const modal=document.getElementById(modalId) as HTMLDialogElement | null;
                modal?.showModal()
            } }>open modal</button>
            <dialog id={modalId} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add User </h3>
                    <p className="py-4">
                        {/* <SignUp/>  */}
                    </p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>


        </div>
    )
}

export default AddUser
