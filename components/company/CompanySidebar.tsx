
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
import type  { RootState } from 'lib/redux/store'

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
    const {pendingJoinReqs} = useSelector((state: RootState)=>state.company)
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


    return (
        <div>
            {loading
                ? <div className='skeleton h-10 w-full'></div>
                : <HeadingTag heading={data ? data.name : 'CompanyName'} />
            }




            <div className='flex flex-col items-start mt-5 gap-2'>
                <div className='flex  flex-col gap-2'>
                    <div className=' flex items-center gap-2 '>
                        <BasicIcons label='gridView' />
                        <button className='btn btn-neutral hover:text-blue-400 duration-200 btn-sm flex items-center gap-2 '>
                            Overview
                        </button>

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

                <h1 className='text-xs tracking-widest opacity-50 my-3 uppercase flex items-center gap-0'>
                    departments 
                <LuCornerRightDown className='text-sm' /></h1>

                {/* departments  */}
                {data && data.departments.map((d: DepartmentWithRelations) => {
                    return (
                        <div className='flex  flex-col gap-2'>
                            <div className=' flex items-center gap-2 '>
                                <BasicIcons label='department' />
                                <Link href={`/mycompanies/${companyId}/${d.id}`}
                                    className={`btn btn-neutral hover:text-blue-200 duration-200 btn-sm flex items-center gap-2 ${pathName.includes(`/mycompanies/${companyId}/${d.id}`) && 'text-white font-bold tracking-wider'} `}>
                                    {d.name}
                                </Link>
                                <AddProjectModal departmentId={d.id} companyId={data.id} justIcon={true} />
                            </div>

                            {d.projects.length > 0 ?
                                <div className='flex flex-col items-start gap-2'>
                                    {d.projects.map((p: Project) => {
                                        return (
                                            <Link
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

            {/* <pre className='text-xs tracking-widest'>
                    {JSON.stringify(data, null, 10)}
                </pre>  */}

        </div>
    )
}

export default CompanySidebar
