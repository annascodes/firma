'use client'
import React, { useEffect, useState } from 'react'
import BasicIcons from '../BasicIcons';
import type { CompanyJoinRequest, CompanyMembership, User } from '@prisma/client';
import { useApiReq } from 'lib/hooks/useApiReq';
import ErrorDiv from 'components/ErrorDiv';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'lib/redux/store';
import { setPendingJoinReqs } from 'lib/redux/companySlice';

type CompanyJoinReqWithRelations = CompanyJoinRequest & {
    user: User;
}

type ApiPropType = {
    newMemberShip: CompanyMembership,
    updatedJoinReq: CompanyJoinRequest;
}
const JoinReqRespModal = ({ joinReq }: { joinReq: CompanyJoinReqWithRelations }) => {
    const modalId = `joinReqResModal-${joinReq.id}`;
    const dispatch = useDispatch()
    const {pendingJoinReqs} = useSelector((state: RootState)=>state.company)
    const [isData, setIsData] = useState(false)

    const { request, data, loading, error } = useApiReq<ApiPropType>()

    const handleGiveResponse = (response: string) => {
        request(`/api/company/${joinReq.companyId}/joinrequests/${joinReq.id}`, 'PUT', { status: response })

    }

    useEffect(() => {
        if (data) {
            dispatch(setPendingJoinReqs(pendingJoinReqs-1))
            setIsData(true)

        }
    }, [data])



    const disabledOn =  loading || joinReq.status !=='PENDING' ||  isData

    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn btn-neutral btn-outline text-xs tracking-widest" onClick={() => {
                const modal = document.getElementById(modalId) as HTMLDialogElement | never;
                modal?.showModal()
            }}>
                {data?.updatedJoinReq.status || joinReq.status}
            </button>
            <dialog id={modalId} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Response to <span className='font-medium'>{joinReq.user.email}</span> </h3>
                    <div className="py-4 flex justify-center gap-3">

                        <button disabled={disabledOn} onClick={() => handleGiveResponse('PENDING')} className='btn btn-outline '>
                            <BtnBody status='PENDING' isSelected={joinReq.status === 'PENDING'} />
                        </button>
                        <button disabled={disabledOn} onClick={() => handleGiveResponse('APPROVED')} className='btn btn-outline '>
                            <BtnBody status='APPROVED' isSelected={joinReq.status === 'APPROVED'} />
                        </button>
                        <button disabled={disabledOn} onClick={() => handleGiveResponse('REJECTED')} className='btn btn-outline '>
                            <BtnBody status='REJECTED' isSelected={joinReq.status === 'REJECTED'} />
                        </button>

                    </div>
                    <div className='flex justify-center my-4'>
                        {loading && <span className='loading loading-spinner loading-sm'></span>}
                    </div>

                    {
                        error && <ErrorDiv error={error} />
                    }

                    <pre className='text-xs tracking-widest'>
                        data:
                        {JSON.stringify(data, null, 10)}
                    </pre>

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
