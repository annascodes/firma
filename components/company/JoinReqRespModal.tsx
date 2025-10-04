'use client'
import React from 'react'
import BasicIcons from '../BasicIcons';
import type { CompanyJoinRequest, User } from '@prisma/client';
import { useApiReq } from 'lib/hooks/useApiReq';

type CompanyJoinReqWithRelations = CompanyJoinRequest & {
    user: User;
}
const JoinReqRespModal = ({ joinReq }: { joinReq: CompanyJoinReqWithRelations }) => {
    const modalId = `joinReqResModal`

    const {request, data, loading, error} = useApiReq()

    const handleGiveResponse = (response: string)=>{


    }

    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn btn-neutral btn-outline text-xs tracking-widest" onClick={() => {
                const modal = document.getElementById(modalId) as HTMLDialogElement | never;
                modal?.showModal()
            }}>
                {joinReq.status}
            </button>
            <dialog id={modalId} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Response to <span className='font-medium'>{joinReq.user.email}</span> </h3>
                    <div className="py-4 flex justify-center gap-3">

                        <button onClick={()=>handleGiveResponse('PENDING')} className='btn btn-outline '>
                            <BtnBody status='PENDING' isSelected={joinReq.status === 'PENDING'} />
                        </button>
                        <button  onClick={()=>handleGiveResponse('APPROVED')} className='btn btn-outline '>
                            <BtnBody status='APPROVED' isSelected={joinReq.status === 'APPROVED'} />
                        </button>
                        <button  onClick={()=>handleGiveResponse('REJECTED')} className='btn btn-outline '>
                            <BtnBody status='REJECTED' isSelected={joinReq.status === 'REJECTED'} />
                        </button>

                    </div>

                    <p className='text-xs mt-5 text-red-500 tracking-widest'>NOTE: After approving, you can only remove/fire the user from users of your company</p>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </div>
    )
}

export default JoinReqRespModal

type BtnBodyProp = {
    status: string;
    isSelected: boolean
}
const BtnBody = ({ status = 'n/a', isSelected = false }: BtnBodyProp) => {
    return (
        <>
            {isSelected
                ? <BasicIcons label='filledCheckbox' />
                : <BasicIcons label='emptyCheckbox' />
            }
            <p>{status}</p>
        </>
    )
}
