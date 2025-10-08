'use client'
import React, { useEffect, useState } from 'react'
import { useApiReq } from '../../lib/hooks/useApiReq';
import type { CompanyMembership, Task, User } from '@prisma/client';
import { FaPlus } from "react-icons/fa6";
import BasicIcons from '../BasicIcons';



type TaskWithRelations = Task & {
    assignee: User
}

type PropType = {
    preBuilt?: TaskWithRelations;
    id: string;
    projectId: string;
    companyId: string
    handleNewlyAddedTask?: (newTask: TaskWithRelations) => void;

}
type CompanyMemberShipWithRelations = CompanyMembership & {
    user: User;
}

const AddTaskModal = ({ id, projectId, companyId, preBuilt, handleNewlyAddedTask }: PropType) => {
    const modalId = `${id}-addTaskToProj`
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [due, setDue] = useState('')
    const [assignTo, setAssginTo] = useState('')
    const { request, data, loading, error } = useApiReq<TaskWithRelations>()
    const { request: UsersReq, data: UsersData, loading: UsersLoading, error: UsersError } = useApiReq<CompanyMemberShipWithRelations[]>()

    useEffect(() => {
        if (preBuilt) {
            // console.log('preBuilt in addTaskModal: ',preBuilt)
            setTitle(preBuilt.title)
            setDesc(preBuilt.description ?? '')
            if (preBuilt.dueAt) {
                // if your input type="datetime-local"
                const formatted = new Date(preBuilt.dueAt)
                    .toISOString()
                    .slice(0, 16) // trims to yyyy-MM-ddTHH:mm
                setDue(formatted)
            }
        }

    }, [preBuilt])

    const handleCreateTask = () => {
        console.log('title, desc, due : ', { title, desc, due })
        request(`/api/task/`, 'POST', { title, desc, due, projectId, assignTo })
    }
    useEffect(() => {
        if (data)
            handleNewlyAddedTask?.(data)

    }, [data])

    const handleFetchCompUsers = () => {

        UsersReq(`/api/company/${companyId}/companymembership`)
    }
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn  btn-outline border-none btn-sm flex gap-2 items-center" onClick={() => {
                handleFetchCompUsers()
                const modal = document.getElementById(modalId) as HTMLDialogElement | null;
                modal?.showModal()
            }}> {preBuilt
                ? <> <BasicIcons label='edit' size='text-base' /></>
                : <><FaPlus className='text-base' /> Add Task</>} </button>
            <dialog id={modalId} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg flex gap-2 items-center">

                        {preBuilt
                            ? <> <BasicIcons label='edit' /> Edit Task </>
                            : <>  <BasicIcons label='task' /> Add task here</>}
                    </h3>
                    <p className="py-4">
                        <div>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Task title</legend>
                                <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" className="input w-full" placeholder="Project Name" />
                                {/* <p className="label">Optional</p> */}
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Description</legend>
                                <textarea onChange={(e) => setDesc(e.target.value)} value={desc} className="textarea w-full" placeholder="Description"></textarea>
                                {/* <p className="label">Optional</p> */}
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Due date</legend>
                                <input onChange={(e) => setDue(e.target.value)} value={due} type="datetime-local" className="input w-full" />
                                {/* <p className="label">Optional</p> */}
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend flex items-center gap-2">Assignee

                                    {UsersLoading && <span className='loading loading-spinner loading-sm'></span>}
                                </legend>
                                {
                                    UsersLoading
                                        ? <div className='skeleton h-18 w-full'></div>
                                        : <div className='flex flex-col items-start gap-2 border border-neutral-300 rounded-xl p-2 h-40 overflow-auto '>
                                            {UsersData && UsersData.map(u => {
                                                return (
                                                    <button
                                                        onClick={() => {
                                                            setAssginTo(u.user.id)
                                                        }}
                                                        className={`btn btn-outline  ${assignTo === u.user.id ? 'btn-neutral' : 'border-none'}`}
                                                    >
                                                        {assignTo === u.user.id
                                                            ? <BasicIcons label='filledCheckbox' />
                                                            : <BasicIcons label='emptyCheckbox' />
                                                        }

                                                        {u.user.email}
                                                    </button>
                                                )
                                            })}
                                        </div>


                                }

                                {/* <pre className='text-xs tracking-widest'>
                                    UsersData:
                                    {JSON.stringify(UsersData, null, 10)}
                                </pre> */}

                            </fieldset>


                            <button disabled={loading} onClick={handleCreateTask} className='btn btn-neutral w-full mt-5'>
                                {loading ? <span className='loading loading-spinner loading-sm'></span> : 'Create Task'}
                            </button>
                        </div>
                    </p>

                    <pre className='text-xs tracking-widest'>
                        preBuilt:
                        {preBuilt && JSON.stringify(preBuilt, null, 10)}
                    </pre>
                    <pre className='text-xs tracking-widest'>
                        data:
                        {JSON.stringify(data, null, 10)}
                    </pre>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </div>
    )
}

export default AddTaskModal
