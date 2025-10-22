'use client'
import React, { useEffect, useState } from 'react'
import BasicIcons from '../BasicIcons';
import type { Attachment, Task, User } from '@prisma/client';
import AddTaskModal from './AddTaskModal';
import TaskPriority from './TaskPriority';
import TaskStatus from './TaskStatus';
import moment from 'moment';
import DeletePermit from '../DeletePermit';
import AttachmentUploader from 'components/AttachmentUploader';
import AttachmentFile from 'components/AttachmentFile';

type TaskWithRelations = Task & {
    assignee: User;
    attachments?: Attachment[]
}
type PropType = { task: TaskWithRelations; isAdmin?: boolean; companyId: string, isAssignee: boolean }

const ShowTaskInModal = ({ task, isAdmin = false, companyId, isAssignee }: PropType) => {
    const modalId = `${task.id}-showTaskInModal`;
    const [attachments, setAttachments] = useState<Attachment[]>([])


    useEffect(() => {
        if (task && task.attachments) {
            setAttachments(task.attachments)
        }
    }, [task])

    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="hover:bg-gray-200 px-1 rounded-md duration-200 font-bold text-xl cursor-pointer" onClick={() => {
                const modal = document.getElementById(modalId) as HTMLDialogElement | null;
                if (isAssignee) {
                    modal?.showModal()
                }

            }}>
                {task.title.length > 25 ? `${task.title.slice(0, 25)} ...` : task.title}
            </button>
            <dialog id={modalId} className="modal">
                <div className="modal-box border-0 border-neutral-800 max-w-4xl">
                    {
                        isAdmin &&

                        <>
                            <div className='flex justify-end gap-0 items-center mb-3'>
                                <AddTaskModal companyId={companyId} preBuilt={task} id={task.id} projectId={task.projectId} />

                                <DeletePermit id={task.id} />

                            </div>
                        </>
                    }
                    <div className='flex justify-between items-center'>

                        <div className="font-bold text-lg flex item-center gap-2">
                            <span>TASK</span>
                            <div className="dropdown dropdown-start ">
                                <div className='flex items-center gap-2'>
                                    {/* <p className='text-xs opacity-40'>Status</p> */}
                                    <div tabIndex={0} role="button" className="cursor-pointer flex items-center gap-0 border p-1 rounded-md border-neutral-300 border-dashed">
                                        <TaskStatus status={task.status} />
                                        <BasicIcons label='arrowDown' />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-neutral-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                    <StatusBox isChecked={task.status == 'TODO'} status='TODO' />
                                    <StatusBox isChecked={task.status == 'IN_PROGRESS'} status='IN_PROGRESS' />
                                    <StatusBox isChecked={task.status == 'DONE'} status='DONE' />
                                    <StatusBox isChecked={task.status == 'BLOCKED'} status='BLOCKED' />
                                </ul>
                            </div>
                        </div>

                        <div className='flex items-center gap-1'>
                            <span className='text-xs opacity-40'>priority</span>
                            <TaskPriority priority={task.priority} />
                        </div>
                    </div >
                    <p className="py-4 flex flex-col gap-2">

                        <div className='flex items-center gap-2'>
                            <BasicIcons label='calender' />
                            <span className='text-xs opacity-40'>posted</span>
                            <p className=''>{moment(task.createdAt).format("ddd, DD MMMM YYYY, h:mma")} </p>
                        </div>
                        <div className='flex items-center flex-wrap gap-2'>
                            <BasicIcons label='clock' />
                            <span className='text-xs opacity-40'>due</span>
                            <p className=''>{moment(task.dueAt).format("ddd, DD MMMM YYYY, h:mma")} </p>
                            <p className=' badge badge-neutral badge-sm'>{moment(task.dueAt).fromNow()} </p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <BasicIcons label='textFile' />
                            <p className='text-2xl font-semibold'>{task.title} </p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <BasicIcons label='info' />
                            <p>{task.description} </p>
                        </div>

                        <div className='flex items-center  gap-2'>
                            <BasicIcons label='attachment' />
                            {attachments.length === 0 && <span className='opacity-40'>no attachment</span>}
                            <div className='flex items-center flex-wrap gap-2 '>
                                {attachments.map(a => {
                                    return (
                                        <AttachmentFile key={a.id} attachment={a} />
                                    )
                                })}
                            </div>
                        </div>

                        {isAdmin &&
                            <div className='flex items-center gap-2 mt-10'>
                                {/* <BasicIcons label='attachment' /> */}
                                <AttachmentUploader taskId={task.id} setAttachments={setAttachments} />
                            </div>
                        }

                       

                        {/* <pre className='text-xs tracking-widest'>
                            {JSON.stringify(task, null, 10)}
                        </pre> */}
                    </p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </div>
    )
}

export default ShowTaskInModal



type TypesstatusBox = {
    isChecked: boolean;
    status: 'DONE' | 'IN_PROGRESS' | 'TODO' | 'BLOCKED';

}
const StatusBox = ({ isChecked, status }: TypesstatusBox) => {
    return (
        <li onClick={() => alert(`You clicked on ${status}`)} className='flex flex-row items-center gap'>
            {isChecked
                ? <BasicIcons label='filledCheckbox' />
                : <BasicIcons label='emptyCheckbox' />
            }
            <p className='uppercase '>{status === 'IN_PROGRESS' ? 'IN PROGRESS' : status} </p>

        </li>
    )
}
