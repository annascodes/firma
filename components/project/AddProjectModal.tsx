'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import BasicIcons from '../BasicIcons'
import { useApiReq } from '../../lib/hooks/useApiReq'
import type { Company, Department, Project } from '@prisma/client'

type DepartmentWithRelations = Department & {
    company: Company;
    projects: Project[]
}

type PropType = {
    departmentId: string;
    companyId: string;
    setData?: Dispatch<SetStateAction<DepartmentWithRelations | null>>
    justIcon?: boolean;
    handleSetData: (project:Project) =>void
}

const AddProjectModal = ({ departmentId, companyId, setData, justIcon = false, handleSetData }: PropType) => {
    const modalId =   `${departmentId}-${companyId}-addProjectModal`
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const { request, data, loading, error } = useApiReq<Project>()
    const handleCreateProject = () => {
        console.log('name , desc : ', { name, desc })
        request(`/api/project`, 'POST', { name, desc, departmentId, companyId })
    }
    useEffect(() => {
        if (data && setData) {

            setData((prev) => (prev && {
                ...prev,
                projects: [...prev.projects, data],
            }))
        }
        if(data ){
            handleSetData(data)
        }

    }, [data])
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button
                disabled={loading}
                className={` ${justIcon ? 'cursor-pointer hover:text-blue-600 duration-200' : 'btn btn-neutral btn-sm'}`}
                onClick={() => {
                    const modal = document.getElementById(modalId) as HTMLDialogElement | null
                    modal?.showModal()
                }}
            > {loading
                ? <span className='loading loading-xs '></span>
                : <> <BasicIcons label='addProject' /> {!justIcon && ' Add project'} </>} </button>
            <dialog id={modalId} className="modal">
                <div className="modal-box z-50">
                    <h3 className="font-bold text-lg">Add Project Modal</h3>
                    <div className="py-4">
                        <div>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Project Name</legend>
                                <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="input w-full" placeholder="Project Name" />
                                {/* <p className="label">Optional</p> */}
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Description</legend>
                                <textarea onChange={(e) => setDesc(e.target.value)} value={desc} className="textarea w-full" placeholder="Description"></textarea>
                                {/* <p className="label">Optional</p> */}
                            </fieldset>
                            <button disabled={loading} onClick={handleCreateProject} className='btn btn-neutral w-full mt-5'>
                                {loading ? <span className='loading loading-spinner loading-sm'></span> : 'Create Project'}
                            </button>
                        </div>
                    </div>
                    <pre className='text-xs tracking-widest'>
                        data:
                        {JSON.stringify(data, null, 10)}
                    </pre>
                    {error && <pre className='text-red-500 text-xs tracking-widest'>
                        error:
                        {JSON.stringify(error, null, 10)}
                    </pre>}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>


        </div>
    )
}

export default AddProjectModal
