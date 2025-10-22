'use client'
import BasicIcons from 'components/BasicIcons';
import React, { useState } from 'react'
import CreateDepartmentForm from './CreateDepartmentForm';
import type { Department } from '@prisma/client';

type PropType = {
    companyId: string;
    companyName: string;
    handleAddDepartToExistingArr?: (depart: Department) => void
}

const CreateDepartmentModal = ({ companyId, companyName, handleAddDepartToExistingArr }: PropType) => {
    const [loading, setLoading] = useState(false)
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button
                disabled={loading}
                className={`btn btn-neutral btn-outline btn-xs text-xs tracking-widest flex items-center gap-1 `}
                onClick={() => {
                    const modal = document.getElementById('my_modal_2') as HTMLDialogElement | null;
                    modal?.showModal()
                }}>
                {
                    loading
                        ? <span className='loading loading-dots loading-sm'></span>
                        : <>     <BasicIcons label='plus' size='text-base' />
                            Department </>
                }

            </button>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                   
                    <p className="">

                        <CreateDepartmentForm
                            company={{ id: companyId, name: companyName }}
                            handleAddDepartToExistingArr={handleAddDepartToExistingArr}
                            setLoading={setLoading}
                        />

                    </p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}

export default CreateDepartmentModal
