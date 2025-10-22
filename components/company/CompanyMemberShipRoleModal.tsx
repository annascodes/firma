import type { CompanyRole } from '@prisma/client';
import BasicIcons from 'components/BasicIcons';
import { companyMembershipRoles } from 'lib/hardData';
import React, { useEffect, useState } from 'react'

type PropType = {
    id: string;
    role: string;
    email: string;
}
const CompanyMemberShipRoleModal = ({ id, role, email }: PropType) => {
    const modalId = `companyMembershipRoleModal-${id}`
    const [userRole, setUserRole] = useState('')
    useEffect(() => {
        if (role)
            setUserRole(role)
    }, [role])

    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button
                className='btn btn-neutral btn-outline text-xs tracking-widest'
                onClick={() => {
                    const modal = document.getElementById(modalId) as HTMLDialogElement | null;
                    modal?.showModal()
                }}>
                {role}
            </button>
            <dialog id={modalId} className="modal">
                <div className="modal-box">
                    
                    <h3 className="font-bold text-lg">Change Role to:  </h3>
                    <div className="py-4 flex flex-col justify-start items-start  gap-1">

                        {companyMembershipRoles.map(r => {
                            return (
                                <button
                                key={`r`}
                                    className={`btn btn-neutral btn-outline text-xs tracking-widest  ${userRole === r ? 'border' : 'border-none'}`}>
                                    {
                                        userRole === r
                                        ? <BasicIcons label="filledCheckbox" />
                                        : <BasicIcons label="emptyCheckbox" />
                                    }
                                    {r}
                                </button>
                            )
                        })}

                    </div>
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <span className='opacity-35'>For user</span>
                          <span className='font-medium'>{email}</span>  </h3>
                     
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </div>
    )
}

export default CompanyMemberShipRoleModal
