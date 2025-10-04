'use client'
import React, { useEffect, useState } from 'react'
import { useApiReq } from '../../lib/hooks/useApiReq';
import type { Task, User } from '@prisma/client';
import { FaPlus } from "react-icons/fa6";
import BasicIcons from '../BasicIcons';



type TaskWithRelations = Task & {
    assignee: User
}

type PropType = {
    preBuilt?: TaskWithRelations;
    id: string;
    projectId: string;
    handleNewlyAddedTask? : (newTask: TaskWithRelations)=>void;

}

const AddTaskModal = ({ id, projectId, preBuilt,handleNewlyAddedTask  }: PropType) => {
    const modalId = `${id}-addTaskToProj`
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [due, setDue] = useState('')
    const { request, data, loading, error } = useApiReq<TaskWithRelations>()

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
        request(`/api/task/`, 'POST', { title, desc, due, projectId })
    }
    useEffect(()=>{
        if(data)
            handleNewlyAddedTask?.(data)

    },[data])
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn  btn-outline border-none btn-sm flex gap-2 items-center" onClick={() => {
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
                                <legend className="fieldset-legend">Assignee</legend>

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
