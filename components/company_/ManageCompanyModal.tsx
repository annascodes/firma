import type { Company, Department, Project, Task } from '@prisma/client'
import BasicIcons from 'components/BasicIcons';
import DeletePermit from 'components/DeletePermit';
import { useApiReq } from 'lib/hooks/useApiReq';
import React, { useEffect, useState } from 'react'

type DepartmentWithRelations = Department & {
    projects: Project[]
}

type PropType = {
    department: DepartmentWithRelations;

}

type TypeFullProj = {
    projectId: string;
    tasks: Task[];
}

type ProjectWithRelations = Project & {
    tasks: Task[]
}


const ManageCompanyModal = ({ department }: PropType) => {
    const modalId = `manageCompanyModalId ${department.id}`
    const { request, data, loading, error } = useApiReq<ProjectWithRelations>()
    const [fullProj, setFullProj] = useState<ProjectWithRelations[]>()
    const [projectId, setProjectId] = useState('')
    const handleFetchDepartProjs = (projId: string) => {
        setProjectId(projId)
        request(`/api/project/${projId}`)
    }

    useEffect(() => {
        if (data) {
            setFullProj((prev) => {
                if (!prev) return [data];
                return [
                    ...prev,
                    data
                ]
            })
        }
    }, [data])
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="" onClick={() => {
                const modal = document.getElementById(modalId) as HTMLDialogElement | null;
                modal?.showModal()
            }}>
                <BasicIcons label='settings' />
            </button>
            <dialog id={modalId} className="modal">
                <div className="modal-box">
                    <div className="font-bold text-lg flex items-center gap-2 mb-5 ">
                        <BasicIcons label='settings' size='animate-spin' />
                        <h1>Manage department</h1>
                    </div>
                    <div className='flex items-end '>
                        <div className='flex items-center gap-2 bg-stone-200  p-2 rounded-lg     '>
                            <BasicIcons label='department' size='text-3xl' />
                            <p className='text-3xl font-semibold'> {department.name}</p>
                        </div>
                    </div>
                    <p className="">
                        {department.projects.map(p => {
                            return (
                                <div className='border border-neutral-400 rounded-lg p-2 my-2'>
                                    <div className='flex items-center justify-between '>
                                        <div className='flex items-center gap-2 font-semibold'>
                                            <BasicIcons label='project' size='text-2xl' />
                                            <p className='text-xl'> {p.name}</p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <button
                                                disabled={loading }
                                                onClick={() => handleFetchDepartProjs(p.id)}
                                                className='btn btn-neutral btn-outline btn-xs border-none p-1'>
                                                {(loading && projectId === p.id)
                                                    ? <span className='loading loading-dots loading-sm'></span>
                                                    : <BasicIcons label='arrowDown' size='text-2xl' />
                                                }

                                            </button>
                                           <DeletePermit id={p.id} message={`Delete this project - ${p.name}`} />
                                        </div>

                                    </div>



                                    <div className='max-h-52 overflow-auto  '>
                                        {
                                            fullProj && fullProj.map(fp => {
                                                if (fp.id === p.id) {
                                                    return (
                                                        <div>
                                        <span className='text-xs tracking-widest opacity-40'>Tasks</span>

                                                            {fp.tasks.length === 0 &&
                                                                <div className='text-xs opacity-50 tracking-wider text-center'> no task</div>}
                                                            {fp.tasks.map(t => {
                                                                return (
                                                                    <div className='flex justify-between items-center bg-blue-50 my-2 p-2 rounded-lg'>
                                                                        <div className='flex items-center text-sm   gap-2 '>
                                                                            <BasicIcons label='textFile' size='text-base' />
                                                                            <p> {t.title}</p>
                                                                        </div>
                                                                       <DeletePermit 
                                                                       id={t.id} 
                                                                       message={`Delete this task - ${t.title}`} 
                                                                       css={`text-base text-red-400`}
                                                                       />
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    )
                                                }

                                            })
                                        }
                                    </div>

                                    {/* <pre className='text-xs tracking-widest'>
                                        {JSON.stringify(fullProj, null, 10)}
                                    </pre> */}
                                </div>
                            )
                        })}
                    </p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}

export default ManageCompanyModal


/* 

[

{
projectId: 123,
tasks: []
}

]

*/