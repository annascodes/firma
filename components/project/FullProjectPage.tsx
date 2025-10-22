'use client'
import React, { use, useEffect, useState } from 'react'

import { type Attachment, type Company, type Department, type Project, type Task, type User } from '@prisma/client';
import BasicIcons from 'components/BasicIcons';
import AddTaskModal from 'components/task/AddTaskModal';
import moment from 'moment';
import TaskPriority from 'components/task/TaskPriority';
import TaskStatus from 'components/task/TaskStatus';
import Link from 'next/link';
import ShowTaskInModal from 'components/task/ShowTaskInModal';
import { useApiReq } from 'lib/hooks/useApiReq';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';




type PropType = {
    projectId: string;
}
type TaskWithRelations = Task & {
    assignee: User;
    attachments?: Attachment[]
}

type ProjectWithRelations = Project & {
    company: Company;
    department: Department;
    tasks: TaskWithRelations[];
}

const FullProjectPage = ({ projectId }: PropType) => {
    const pathName = usePathname()
    const { user } = useUser()
    const {request:UserReq, data:UserData, loading:UserLoading , error:UserError}  = useApiReq<User>()
    const [project, setProject] = useState<ProjectWithRelations | null>(null);
    const [tasks, setTasks] = useState<TaskWithRelations[]>([])
    const [view, setView] = useState('listView')
    const { request: reqProject, data: reqData, loading, error } = useApiReq<ProjectWithRelations>()
    useEffect(() => {
        reqProject(`/api/project/${projectId}`)
        UserReq(`/api/currentuser`)
    }, [])
    useEffect(() => {
        if (reqData) {
            setProject(reqData)
            setTasks(reqData.tasks)
        }
    }, [reqData])

    const handleNewlyAddedTask = (newTask: TaskWithRelations) => {
        setTasks([newTask, ...tasks])
    }
    return (
        <div className=' mx-auto'>
        
            <div
            // className="flex flex-col gap-2 p-[4px] rounded-xl bg-gradient-to-r from-green-500 via-amber-800 to-yellow-600"
            >
                <div className="flex flex-col gap-2 p-3 rounded-lg  bg-white">

                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
                            <BasicIcons label='company' />
                            <div className='flex flex-col'>
                                <span className='text-xs opacity-40'>
                                    company
                                </span>
                                {
                                    loading
                                        ? <div className='skeleton h-8 w-44'></div>
                                        : <p className='text-xs font-semibold'>{project?.company.name}</p>
                                }
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <BasicIcons label='department' />
                            <div className='flex flex-col'>
                                <span className='text-xs opacity-40'>
                                    department
                                </span>
                                {
                                    loading
                                        ? <div className='skeleton h-8 w-44'></div>
                                        : <p className='text-xs font-semibold'>{project?.department.name}</p>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <BasicIcons label='project' />
                        {loading ? <div className='skeleton h-8 w-44'></div> : <p className='md:text-4xl font-extrabold'>{project?.name}</p>}
                    </div>
                    <div className='flex items-center gap-2'>
                        <BasicIcons label='info' />
                        <span className='text-xs opacity-40'>description</span>
                        {loading ? <div className='skeleton h-8 w-44'></div> : <p className=''>{project?.name}</p>}
                    </div>




                </div>
            </div>



            {
                project &&
                <div className='flex justify-between items-center    my-5'>
                    <div className='flex items-center gap-1  '>
                        <div className='flex justify-end items-center gap-0  '>
                            {/* <span className='text-xs opacity-40'>view</span> */}
                            <button
                                onClick={() => setView('gridView')}
                                className={`btn btn-sm ${view === 'gridView' ? 'btn-neutral' : 'btn-outline border-none'}`}
                            >
                                <BasicIcons label='gridView' size='text-base' />
                            </button>
                            <button
                                onClick={() => setView('listView')}
                                className={`btn btn-sm ${view === 'listView' ? 'btn-neutral' : 'btn-outline border-none'}`}
                            >
                                <BasicIcons label='listView' size='text-base' />
                            </button>

                        </div>
                        {/* <p className='text-xl font-semibold'>Tasks</p> */}
                    </div>
                  
                  {UserLoading &&  <span className='loading loading-dots loading-xs'></span> }
                    {project.company.ownerId === UserData?.id && <AddTaskModal id={project?.id} companyId={project?.companyId} projectId={project?.id} handleNewlyAddedTask={handleNewlyAddedTask} />}


                </div>
            }


            {true &&

                <div className='flex flex-col md:flex-row md:justify-center gap-2 flex-wrap'>
                    {tasks.length > 0 ? tasks.map((t: TaskWithRelations) => {
                        return (
                            <div key={t.id} className={`border w-full md:w-xs border-neutral-300 rounded-xl p-5  `}>
                                <div className='flex justify-between'>

                                    {
                                        t.status !== 'DONE' ?
                                            <span className='text-xs tracking-widest'>
                                                <span className='text-xs text-blue-500 tracking-widest'>Due </span>
                                                {moment(t.dueAt).fromNow()}

                                            </span>
                                            : <div> </div>

                                    }


                                    <TaskStatus status={t.status} />

                                </div>
                                {/* <Link href={''} className={` text-xl font-semibold ${t.status ==='TODO' && 'animate-bounce  bg-white'}`}>{t.title} </Link> */}
                                {/* <p>{t.description}</p> */}
                                <ShowTaskInModal
                                    key={t.id}
                                    companyId={project?.company.id || ''}
                                    task={t}
                                    isAdmin={UserData?.id === project?.company.ownerId} 
                                    isAssignee= {UserData?.id === t.assigneeId  || UserData?.id === project?.company.ownerId}    
                                />
                                    
                                
                                <div className='flex justify-between items-center border-0 mt-2'>
                                    <p className='flex items-center gap-1  '> <BasicIcons label='assignee' size='text-lg' /> {t.assignee.name}</p>
                                    {/* <p className='flex items-center gap-1 badge-outline badge  mt-5'>  {t.priority}</p> */}
                                    <TaskPriority priority={t.priority} />
                                </div>
                                {/* <div className="divider divider-neutral opacity-30"></div> */}
                            </div>
                        )
                    }) : <span className='text-xs tracking-widest opacity-40'>zero task added yet</span>}
                </div>
            }



            {/* <pre className='text-xs tracking-widest'>
                project:
                {JSON.stringify(project, null, 10)}
            </pre> */}
            <div>

            </div>


        </div>
    )
}

export default FullProjectPage;


