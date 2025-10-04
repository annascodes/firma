'use client'
import React, { use, useEffect, useState } from 'react'
import { useApiReq } from '../../../../lib/hooks/useApiReq'
import HeadingTag from '../../../../components/HeadingTag'
import type { Department } from '@prisma/client'
import type { Company } from '@prisma/client'
import type { Project } from '@prisma/client'
import BasicIcons from '../../../../components/BasicIcons'
import AddProjectModal from '../../../../components/project/AddProjectModal'
import Link from 'next/link'

type PropType = {
    params: Promise<{ departmentId: string }>
}

type DepartmentWithRelations = Department & {
    company: Company;
    projects: Project[]
}

const Page = ({ params }: PropType) => {
    const { departmentId } = use(params)
    const [data, setData] = useState<DepartmentWithRelations | null>(null)
    const { request, data: ReqData, loading, error } = useApiReq<DepartmentWithRelations>()
    useEffect(() => {
        request(`/api/department/${departmentId}`)
    }, [])
    useEffect(() => {
        if (ReqData)
            setData(ReqData)
    }, [ReqData])
    return (
        <div className='md:w-3xl mx-auto'>
            {/* <div className='flex items-center gap-2' >
                <HeadingTag heading={`${data?.name}`} /> 
                {loading && <span className=' loading loading-spinner'></span>}
            </div> */}
            <div className='flex flex-col gap-2'>
                <p className='text-4xl font-extrabold flex items-center gap-2'>
                    <BasicIcons label='company' />
                    {loading && <div className='skeleton h-12 w-80'></div>}
                    {data && data.company.name}
                    <span className='opacity-40 text-xs'>company</span>
                </p>
                <p className=' text-2xl md:text-3xl font-semibold flex items-center gap-2'>
                    <BasicIcons label='department' />
                    {loading && <div className='skeleton h-12 w-80'></div>}
                    {data && data.name}
                    <span className='opacity-40 text-xs'>department</span>
                </p>
            </div>

            {/* projects  */}

            <div className='border-0 border-neutral-300 rounded-lg  my-5'>
                <div className='flex justify-between items-center'>

                    <div className='flex items-center gap-2'>
                        <BasicIcons label='project' />
                        <p className='text-xl'>Projects</p>
                    </div>
                    <AddProjectModal 
                    departmentId={departmentId} 
                    companyId={data?.company.id as string}
                    setData = {setData}
                    />
                </div>
                <div className='flex items-center flex-wrap gap-3 m-5'>
                    {(data && data.projects?.length === 0) && <span className='mx-10 opacity-40 text-xs'>No projects added yet.</span>}
                    {data && data.projects?.map((p: Project) => {
                        return (
                            <Link href={`/project/${p.id}`} className='badge badge-outline'>
                                {/* <BasicIcons label='project' /> */}
                                <p>{p.name}</p>
                            </Link>
                        )
                    })}
                </div>
            </div>









            {
                error &&
                <pre className='text-xs tracking-widest text-red-500'>
                    {JSON.stringify(error, null, 10)}
                </pre>
            }
            {/* <pre className='text-xs tracking-widest'>
                data:
                {JSON.stringify(data, null, 10)}
            </pre> */}



        </div>
    )
}

export default Page
