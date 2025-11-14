'use client'
import type { User } from '@prisma/client';
import BasicIcons from 'components/BasicIcons';
import { useApiReq } from 'lib/hooks/useApiReq';
import React, { use, useEffect, useState } from 'react'


const InvitationLetter = () => {
    const modalId = `InvitationLetter-`
    const { request, data, loading, error } = useApiReq<User[]>();
    const [users, setUsers] = useState<User[]>()
    const [keyword, setKeyword] = useState('')
    const handleSearchUsers = () => {
        request(`/api/firmaUsers?keyword=${keyword}`)
    }
    useEffect(() => {
        if (data) {
            setUsers(data)
        }
    }, [data])
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn btn-outline btn-neutral text-xs tracking-widest" onClick={() => {
                const modal = document.getElementById(modalId) as HTMLDialogElement | null;
                modal?.showModal()
            }}>Invite user</button>
            <dialog id={modalId} className="modal">
                <div className="modal-box flex flex-col gap-4  ">
                    <h3 className="font-bold text-lg ">Invitation letter</h3>
                    <div className='flex items-center  justify-center gap-2 flex-wrap '>
                        <label className="input w-full border">
                            <BasicIcons label='search' />
                            <input onChange={(e) => setKeyword(e.target.value)} type="search" required placeholder="Search user here..." className='' />
                        </label>
                        <button disabled={keyword.trim() === '' || loading} onClick={handleSearchUsers} className='btn btn-outline text-xs btn-xs'>
                            {loading
                                ? <span className='loading loading-dots loading-sm'></span>
                                : 'search'
                            }
                        </button>
                    </div>
                    <div className=' flex justify-center text-xs tracking-widest'>
                        {users &&
                            <h1> ( {users.length} ) </h1>
                        }

                    </div>
                    <div className='flex flex-col gap-4  '>
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

                                    <button className='btn btn-outline btn-neutral border-none text-xs tracking-widest btn-sm '>
                                        <BasicIcons label='send' />
                                    </button>
                                </div>
                            )
                        })}

                    </div>



                    {
                        users &&
                        <div className=' flex justify-center'>
                            <button className='w-full btn btn-outline btn-neutral btn-xs text-xs tracking-widest'>
                                see more
                            </button>
                        </div>
                    }
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
