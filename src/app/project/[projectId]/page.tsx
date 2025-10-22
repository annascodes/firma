'use client'
import React, { use, useEffect, useState } from 'react'
import { useApiReq } from '../../../../lib/hooks/useApiReq';
import type { Company, Department, Project, Task, User } from '@prisma/client';
import BasicIcons from '../../../../components/BasicIcons';
import AddTaskModal from '../../../../components/task/AddTaskModal';
import moment from 'moment';




type PropType = {
    params: Promise<{ projectId: string }>
}
type TaskWithRelations = Task & {
    assignee: User
}

type ProjectWithRelations = Project & {
    company: Company;
    department: Department;
    tasks: TaskWithRelations[];
}

const Page = ({ params }: PropType) => {
    const { projectId } = use(params);
    const [project, setProject] = useState<ProjectWithRelations | null>(null);
    const [tasks, setTasks] = useState<TaskWithRelations[]>([])
    const [view, setView] = useState('listView')
    const { request: reqProject, data: reqData, loading, error } = useApiReq<ProjectWithRelations>()
    useEffect(() => {
        reqProject(`/api/project/${projectId}`)
    }, [])
    useEffect(() => {
        if (reqData) {
            setProject(reqData)
            setTasks(reqData.tasks)
        }
    }, [reqData])
    return (
        <div className='md:w-3xl mx-auto'>

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
                        {/* <span className='text-xs opacity-40'>project</span> */}
                        <BasicIcons label='project' />
                        {loading ? <div className='skeleton h-8 w-44'></div> : <p className='text-4xl font-extrabold'>{project?.name}</p>}
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
                        <p className='text-xl font-semibold'>Tasks</p>
                    </div>
                    {/* <AddTaskModal id={project?.id} projectId={project?.id} /> */}

                </div>
            }


            {true &&

                <div>
                    {tasks.length > 0 ? tasks.map((t: TaskWithRelations) => {
                        return (
                            <div key={t.id} className='border border-neutral-300 rounded-xl p-5 my-5'>
                                <div className='flex justify-between'>
                                    <span className='text-xs tracking-widest'>
                                        {/* {moment(t.dueAt).format("Do, dddd MMMM YYYY, h:mm A")} */}
                                        <span className='text-xs text-blue-500 tracking-widest'>Due </span>
                                        {moment(t.dueAt).fromNow()}

                                    </span>
                                    <span className='badge badge-outline tracking-wider badge-sm '>{t.status.toLowerCase()} </span>
                                </div>
                                <h1 className='text-xl font-semibold'>{t.title} </h1>
                                <p>{t.description}</p>
                                <div className='flex justify-between items-center'>
                                    <p className='flex items-center gap-1 badge-outline badge  mt-5'> <BasicIcons label='assignee' size='text-lg' /> {t.assignee.name}</p>
                                    <p className='flex items-center gap-1 badge-outline badge  mt-5'>  {t.priority}</p>
                                </div>
                                 {/* <div className="divider divider-neutral opacity-30"></div> */}
                            </div>
                        )
                    }) : <span className='text-xs tracking-widest opacity-40'>zero task added yet</span>}
                </div>
            }


            {/* 
            <pre className='text-xs tracking-widest'>
                project:
                {JSON.stringify(project, null, 10)}
            </pre> */}


        </div>
    )
}

export default Page;


