'use client'
import React, { useEffect, useState } from 'react'
import BasicIcons from '../BasicIcons';
import { useApiReq } from '../../lib/hooks/useApiReq';
import type { CompanyJoinRequest } from '@prisma/client';


const JoinCompany = () => {
    const modalId = `join-modal-id`
    const [search, setSearch] = useState('')
    const [data, setData] = useState<{ id: string, companyName: string, isSent: boolean }[]>()

    const { request, data: searchedComp, loading, error } = useApiReq<{ id: string, companyName: string, isSent: boolean }[]>()

    const { request: joinReq, data: joinData, loading: joinLoading, error: joinError } = useApiReq<CompanyJoinRequest>()

    const handleSearchCompany = () => {
        console.log('Searching company waite..............', search)
        if (search.trim() === '') {
            alert('Type something for search')
            return
        }
        request(`/api/company/searchCompany?search=${search}`)
    }
    const handleSentJoinReq = (id: string) => {
        joinReq(`/api/companyjoinreq/`, 'POST', { id })

    }
    useEffect(() => {
        if (searchedComp) {
            setData(searchedComp)
        }
    }, [searchedComp])
    useEffect(() => {
        if (joinData) {
            const temp = data && data.map(d=>d.id === joinData.companyId ?{...d, isSent:true}: d )
            setData(temp)
        }
    }, [joinData])
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn btn-dash  text-sm tracking-widest" onClick={() => {
                const modal = document.getElementById(modalId) as HTMLDialogElement | null;
                modal?.showModal()
            }}>
                Join company
            </button>
            <dialog id={modalId} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Join company!

                        {loading && <span className='loading loading-spinner loading-sm'></span>}
                    </h3>


                    {/* <BasicIcons label='send'  showFullLog={true} /> */}

                    <div className='my-2'>
                        <label className="input w-full">
                            <BasicIcons label='search' />
                            <input
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleSearchCompany()
                                    }
                                }} type="search" required placeholder="Search company by name" />
                        </label>
                        {
                            data &&
                            <div className='my-2 p-2 border border-neutral-400 rounded-lg'>
                                {data.map(d => {
                                    return (
                                        <div key={`${d.companyName}-${d.isSent}`} className='flex justify-between items-center  hover:bg-blue-50 rounded-md  p-2'>
                                            <h1 className='flex items-center gap-1 font-semibold'> <BasicIcons label='company' />
                                                {d.companyName}
                                            </h1>

                                            {d.isSent
                                                ? <button className='btn btn-outline btn-sm text-green-400'> <BasicIcons label='DONE' /> Sent</button>
                                                : <button
                                                    disabled={joinLoading}
                                                    onClick={() => handleSentJoinReq(d.id)}
                                                    className='btn btn-dash btn-sm'>
                                                    <BasicIcons label='send' />
                                                    {joinLoading
                                                        ? <span className='loading loading-spinner loading-sm'></span>
                                                        : 'join request'
                                                    }
                                                </button>
                                            }

                                        </div>
                                    )
                                })}
                            </div>
                        }


                        <pre className='text-[8px] tracking-widest mt-20   '>
                            data:
                            {
                                JSON.stringify(data, null, 10)
                            }
                        </pre>
                        <pre className='text-[8px] tracking-widest'>
                            joinData:
                            {
                                JSON.stringify(joinData, null, 10)
                            }
                        </pre>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </div>
    )
}

export default JoinCompany
