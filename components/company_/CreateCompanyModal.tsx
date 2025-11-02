'use client'
import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import CreateCompanyForm from 'components/company/CreateCompanyForm';
import type { Company } from '@prisma/client';

type PropType = {
    handleNewCompany: (data:Company)=>void
}
const CreateCompanyModal = ({handleNewCompany}:PropType) => {
    const { user } = useUser()
    const userId: string = user?.id ? user.id : '';
    const modalId = `${userId}-create-company-modal`
    const [loading, setLoading] = useState(false)

    return (
        <div>
           
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn btn-neutral btn-outline text-sm tracking-widest " onClick={() => {
                const modal = document.getElementById(modalId) as HTMLDialogElement | null;
                modal?.showModal()
            }}>
                {
                    loading 
                    ? <span className='loading loading-dots' ></span>
                    : 'Create Company'
                }
              </button>
            <dialog id={modalId} className="modal">
                <div className="modal-box">
                    <CreateCompanyForm 
                        ownerId={userId} 
                        handleNewCompany={handleNewCompany} 
                        setLoading = {setLoading}
                        />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}

export default CreateCompanyModal
