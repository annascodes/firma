
'use client'
import type { Company, CompanyJoinRequest, Department, Project, User } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import HeadingTag from '../HeadingTag'
import BasicIcons from '../BasicIcons'
import { LuCornerRightDown } from "react-icons/lu";
import { useApiReq } from '../../lib/hooks/useApiReq'
import AddProjectModal from '../project/AddProjectModal'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import type { RootState } from 'lib/redux/store'
import CreateDepartmentModal from 'components/department/CreateDepartmentModal'

type PropType = {
    companyId: string;
}
type DepartmentWithRelations = Department & {
    projects: Project[]
}
type CompanyWithRelations = Company & {
    departments: DepartmentWithRelations[]
}

type joinReqwithRelation = CompanyJoinRequest & {
    user: User;
}

const CompanySidebar = ({ companyId }: PropType) => {
    const { pendingJoinReqs } = useSelector((state: RootState) => state.company)
    const { request, data: reqData, loading, error } = useApiReq<CompanyWithRelations>()
    const [data, setData] = useState<CompanyWithRelations | null>(null)
    const pathName = usePathname()

    useEffect(() => {

        request(`/api/company/${companyId}`)

    }, [companyId])
    useEffect(() => {
        if (reqData) {
            setData(reqData)
        }
    }, [reqData])


    const { request: getPending, data: pendingReqs, loading: pendingLoading, error: pendingError } = useApiReq<joinReqwithRelation[]>()

    useEffect(() => {
        getPending(`/api/company/${companyId}/joinrequests?status=PENDING`)

    }, [])

    const handleSetData = (newProj: Project) => {
        console.log('new project added here--------------')
        console.log(newProj)

        setData((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                departments: prev.departments.map((d) => {
                    if (d.id === newProj.departmentId) {
                        return { ...d, projects: [...d.projects, newProj] }
                    }
                    return d;
                })
            }
        })
    }


    const handleAddDepartToExistingArr = (depart: Department) => {
        setData((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                departments: [{ ...depart, projects: [] } ,...prev.departments]
            }
        })
    }

    return (
        <div>
            <span className='badge badge-error tracking-widest text-white uppercase badge-sm'>owner</span>
            {loading
                ? <div className='skeleton h-10 w-full'></div>
                : <HeadingTag heading={data ? data.name : 'CompanyName'} />
            }




            <div className='flex flex-col items-start mt-5 gap-2 '>
                <div className='flex  flex-col gap-2'>
                    <div className=' flex items-center gap-2 '>
                        <BasicIcons label='gridView' />
                        <Link href={`/mycompanies/${companyId}`} className='btn btn-neutral hover:text-blue-400 duration-200 btn-sm flex items-center gap-2 '>
                            Overview
                        </Link>

                    </div>
                    <div className=' flex items-center gap-2 '>
                        <BasicIcons label='companyMembership' />
                        <Link href={`/mycompanies/${companyId}/users`} className='btn btn-neutral hover:text-blue-400 duration-200 btn-sm flex items-center gap-2 '>
                            Users
                        </Link>

                    </div>
                    <div className=' flex items-center gap-2 '>
                        <BasicIcons label='joinReq' />
                        <Link href={`/mycompanies/${companyId}/joinrequests`} className='btn btn-neutral hover:text-blue-400 duration-200 btn-sm flex items-center gap-2 '>
                            Join Requests <span className=''> ( {pendingJoinReqs} )</span>
                        </Link>
                        {/* <span className='badge badge-neutral'>{pendingReqs?.length} </span> */}
                        {/* <span className='badge badge-neutral'>{pendingJoinReqs} </span> */}
                    </div>
                </div>
                <div className="divider divider-neutral">departments</div>


                <CreateDepartmentModal
                    companyName={data?.name || ''}
                    companyId={data?.id || ''}
                    handleAddDepartToExistingArr={handleAddDepartToExistingArr}
                />


                {/* departments  */}
                <div className='h-80 py-2 overflow-auto '>
                    {data && data.departments.map((d: DepartmentWithRelations) => {
                        return (
                            <div key={`${d.id}-departments`} className='flex  flex-col gap-2 mb-2 '>
                                <div className=' flex items-center gap-2 '>
                                    <BasicIcons label='department' />
                                    <Link href={`/mycompanies/${companyId}/${d.id}`}
                                        className={`btn btn-neutral hover:text-blue-200 duration-200 btn-sm flex items-center gap-2 ${pathName.includes(`/mycompanies/${companyId}/${d.id}`) && 'text-white font-bold tracking-wider'} `}>
                                        {d.name}
                                    </Link>
                                    <AddProjectModal handleSetData={handleSetData} departmentId={d.id} companyId={data.id} justIcon={true} />
                                </div>

                                {d.projects.length > 0 ?
                                    <div className='flex flex-col items-start gap-2'>
                                        {d.projects.map((p: Project) => {
                                            return (
                                                <Link
                                                key={p.id}
                                                    href={`/mycompanies/${p.companyId}/${d.id}/project/${p.id}`}
                                                    className={` flex items-center gap-2 btn btn-outline btn-sm ml-10 ${pathName === `/mycompanies/${p.companyId}/${d.id}/project/${p.id}` && ' btn-active'}`}
                                                > <BasicIcons label='project' size='text-base' /> {p.name} </Link>
                                            )
                                        })}



                                    </div>
                                    : <p className='flex items-center gap-2 badge badge-outline badge-xs tracking-widest border-none ml-10'>  no project </p>
                                }
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* <pre className='text-[9px] tracking-widest'>
                {JSON.stringify(data, null, 10)}
            </pre> */}

        </div>
    )
}

export default CompanySidebar


