'use client'
import React from 'react'
import BasicIcons from './BasicIcons';
import { useApiReq } from 'lib/hooks/useApiReq';
import type { Company } from '@prisma/client';
import moment from 'moment';


type PropType = {
    companyId: string;
    companyName: string;
}

type ReqType = Company & {
    owner: { name: string, email: string };
    _count: { departments: number, projects: number, members: number }
}
const CompanyInfoModal = ({ companyId, companyName }: PropType) => {
    const modalId = `companyInfoModalId ${companyId}`
    const counts = ['department']
    const { request, data, loading, error } = useApiReq<ReqType>()
    const fetchInfo = () => {
        // console.log('companyInfo details')
        request(`/api/company/${companyId}/info`)
    }
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn btn-neutral btn-outline text-xl font-extrabold border-none tracking-widest flex items-center gap-2 " onClick={() => {
                fetchInfo()
                const modal = document.getElementById(modalId) as HTMLDialogElement | null;
                modal?.showModal()
            }}>
                <BasicIcons label='company' />
                {companyName}

            </button>
            <dialog id={modalId} className="modal">
                <div className="modal-box">


                    <div className="font-bold text-lg">
                        <div className='flex items-center gap-2'>
                            <BasicIcons label='company' />
                            <h1>{companyName}</h1>
                        </div>

                    </div>

                    {
                        !loading &&
                        <>
                            <div className='flex items-center gap-2 flex-wrap text-sm'>
                                <h1 className='text-xs  lowercase tracking-widest '>Owner</h1>
                                <h1 className='font-bold'>{data?.owner.name} </h1>
                                <h1 className='text-xs tracking-widest opacity-50'>{data?.owner.email} </h1>
                            </div>
                            <div className='flex items-center gap-2 flex-wrap text-sm '>
                                <h1 className='text-xs  lowercase tracking-widest '>created</h1>
                                {/* <h1>{data?.owner.name} </h1> */}
                                <h1 className='text-xs tracking-widest opacity-50'>{moment(data?.createdAt).format('ddd, Do MMMM YYYY')} </h1>
                            </div>
                        </>
                    }
                    {
                        loading
                            ? <div className='flex justify-center'><span className='loading loading-spinner loading-sm mx-2'></span></div>
                            : <div className='flex items-center justify-center gap-2 mt-5'>
                                <div className='border rounded-xl  p-3'>
                                    <div className='flex items-center gap-2'>
                                        <BasicIcons label='department' />
                                        <h1 className=''>Departments</h1>
                                    </div>
                                    <div className=' flex items-center font-bold justify-center'>
                                        <h1>{data?._count.departments} </h1>
                                    </div>
                                </div>
                                <div className='border rounded-xl  p-3'>
                                    <div className='flex items-center gap-2'>
                                        <BasicIcons label='project' />
                                        <h1 className=''>Projects</h1>
                                    </div>
                                    <div className=' flex items-center font-bold justify-center'>
                                        <h1>{data?._count.projects} </h1>
                                    </div>
                                </div>
                                <div className='border rounded-xl p-3'>
                                    <div className='flex items-center gap-2'>
                                        <BasicIcons label='users' />
                                        <h1 className=''>Members</h1>
                                    </div>
                                    <div className=' flex items-center font-bold justify-center'>
                                        <h1>{data?._count.members} </h1>
                                    </div>
                                </div>
                            </div>
                    }


                    {/* <p className="py-4">
                        <pre className='text-xs tracking-widest'>
                            {JSON.stringify(data, null, 10)}
                        </pre>
                    </p> */}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </div>
    )
}

export default CompanyInfoModal



