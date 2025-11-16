'use client'
import type { InvitationLetter, User } from '@prisma/client';
import BasicIcons from 'components/BasicIcons';
import ErrorDiv from 'components/ErrorDiv';
import { useApiReq } from 'lib/hooks/useApiReq';
import React, { use, useEffect, useState } from 'react'
import SuccessDiv from './SuccessDiv';

type PropType = {
    companyId: string;
}
type InvitationLetterWithRelations = InvitationLetter & {
    user: User;
}
const InvitationLetter = ({ companyId }: PropType) => {
    const modalId = `InvitationLetter-`
    const { request, data, loading, error } = useApiReq<User[]>();
    const { request: InvitationReq, data: InvitationData, loading: InvitationLoading, error: InvitationError } = useApiReq<InvitationLetterWithRelations>();

    const [users, setUsers] = useState<User[]>()
    const [keyword, setKeyword] = useState('')
    const [msg, setMsg] = useState('invitation letter')
    const handleSearchUsers = () => {
        request(`/api/firmaUsers?keyword=${keyword}`)
    }
    useEffect(() => {
        if (data) {
            setUsers(data)
        }
    }, [data])
    const handleSendInvitation = (userId: string) => {
        InvitationReq(`/api/invitationletter`, 'POST', { message: msg, companyId, userId })
    }
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn btn-outline btn-neutral text-xs tracking-widest flex items-center gap-2" onClick={() => {
                const modal = document.getElementById(modalId) as HTMLDialogElement | null;
                modal?.showModal()
            }}>
                <BasicIcons label='addUser' />
                Invite user</button>
            <dialog id={modalId} className="modal">
                <div className="modal-box flex flex-col gap-4  ">
                    <h3 className="font-bold text-lg ">Invitation letter to</h3>
                    <div className='flex items-center  justify-center gap-2 flex-wrap '>
                        <label className="input w-full border">
                            {loading
                                ? <span className='loading loading-dots loading-sm'></span>
                                : <BasicIcons label='search' />
                            }

                            <input
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        if (!(keyword.trim() === '' || loading))
                                            handleSearchUsers()

                                    }
                                }}
                                onChange={(e) => setKeyword(e.target.value)} type="search" required placeholder="Search user here..." className='' />
                        </label>

                    </div>


                    {InvitationData &&
                        <div>
                            {/* <pre className='text-xs text-yellow-500'>
                                InvitationData:
                                {JSON.stringify(InvitationData, null, 10)}
                            </pre> */}
                            <SuccessDiv message={`Invitation letter sent to ${InvitationData.user.email}`} />

                        </div>
                    }
                    {InvitationError &&
                        <div>
                            <ErrorDiv error={InvitationError} />
                            {/* <pre className='text-xs text-red-500'>
                            InvitationError:
                            {JSON.stringify(InvitationError, null, 10)}
                        </pre> */}
                        </div>
                    }

                    <div className=' flex justify-center text-xs tracking-widest'>
                        {users &&
                            <h1> ( {users.length} ) </h1>
                        }
                    </div>
                    <div className='flex flex-col gap-4 max-h-52 overflow-auto '>
                        {users && users.map(u => {
                            return (
                                <div key={u.id} className='flex justify-between items-center'>

                                    <div className='flex items-center gap-2'>

                                        <img src={u.image || ''} className='size-10 rounded-box' alt="" />
                                        <div>
                                            <h1>{u.name}</h1>
                                            <h3 className='text-xs tracking-widest opacity-40'>{u.email}</h3>
                                        </div>
                                    </div>


                                    <div>
                                        <button
                                            disabled={InvitationLoading}
                                            className='btn btn-outline btn-neutral border-none text-xs tracking-widest btn-sm '
                                            onClick={() => {
                                                const modal = document.getElementById(`${u.id}-invitationLetterMsg`) as HTMLDialogElement | null;
                                                modal?.showModal()
                                            }}>
                                            <BasicIcons label='send' />
                                        </button>
                                        <dialog id={`${u.id}-invitationLetterMsg`} className="modal">
                                            <div className="modal-box w-sm">
                                                <fieldset className="fieldset ">
                                                    <legend className="fieldset-legend">Write something in letter</legend>
                                                    <textarea defaultValue={msg} className="textarea w-full h-24" placeholder="Write..."></textarea>
                                                    {/* <div className="label">Optional</div> */}
                                                </fieldset>
                                                <button onClick={() => handleSendInvitation(u.id)} className=' my-1 btn btn-outline btn-neutral border-none text-xs tracking-widest   w-full flex items-center gap-2'>
                                                    <BasicIcons label='send' />
                                                    {InvitationLoading
                                                        ? <span className='loading loading-dots loading-sm'></span>
                                                        : 'send invitation letter'
                                                    }
                                                </button>
                                                {InvitationData &&
                                                    <div> 
                                                        <SuccessDiv message={`Invitation letter sent to ${InvitationData.user.email}`} />

                                                    </div>
                                                }
                                                {InvitationError &&
                                                    <div>
                                                        <ErrorDiv error={InvitationError} />    
                                                    </div>
                                                }


                                            </div>
                                            <form method="dialog" className="modal-backdrop">
                                                <button>close</button>
                                            </form>
                                        </dialog>

                                    </div>


                                </div>
                            )
                        })}

                    </div>



                    {/* {
                        users &&
                        <div className=' flex justify-center'>
                            <button className='w-full btn btn-outline btn-neutral btn-xs text-xs tracking-widest'>
                                see more
                            </button>
                        </div>
                    } */}
                    {/* <pre className='text-xs tracking-widest '>
                        {JSON.stringify(data, null, 10)}
                    </pre> */}

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </div>
    )
}

export default InvitationLetter
