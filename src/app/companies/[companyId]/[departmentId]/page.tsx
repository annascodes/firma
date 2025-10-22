'use client'
import React, { use, useEffect, useState } from 'react'
import { useApiReq } from '../../../../../lib/hooks/useApiReq'
import BasicIcons from '../../../../../components/BasicIcons'
import type { Company, Department, Project } from '@prisma/client'
import Link from 'next/link'
type PropType = {
    params: Promise<{ departmentId: string }>
}

type DepartmentWithRelations = Department & {
    company: Company;
    projects: Project[];
}
const Page = ({ params }: PropType) => {
    const { departmentId } = use(params)
    const { request: reqDeparts, data: reqData, loading, error } = useApiReq<DepartmentWithRelations>()
    const [depart, setDepart] = useState<DepartmentWithRelations>()

    useEffect(() => {
        reqDeparts(`/api/department/${departmentId}`)
    }, [departmentId])

    useEffect(() => {
        if (reqData) {
            setDepart(reqData)
        }
    }, [reqData])

    return (
        <div>
            <div className='flex items-center gap-2 mb-5 '>
                <BasicIcons label='department' size='text-4xl' />
                <div>
                    <h1 className='text-4xl font-extrabold'>{depart && depart.name} </h1>
                    <span className='uppercase text-xs tracking-widest opacity-40'>department</span>
                </div>
            </div>
            [departmentId]/page.tsx-{departmentId}
            {loading && <span className='loading loading-spinner'></span>}


            <div className='flex flex-col md:flex-row flex-wrap md:justify-center  w-full  gap-2'>
                {
                    depart && depart.projects.map(p => {
                        return (
                            <div key={p.id} className='border w-full md:w-80    border-neutral-300 p-4 rounded-xl'>
                                <Link href={`/mycompanies/${p.companyId}/${p.departmentId}/project/${p.id}`} className='flex items-center gap-2 '>
                                    <BasicIcons label='project' />
                                    <h1 className=' text-xl font-semibold '>{p.name} </h1>
                                </Link>
                                <div className='flex justify-start flex-wrap gap-2 items-center'>
                                    <progress className="progress w-56" value={(100 * 7) / 12} max="100"></progress>
                                    <p className='text-xs widest'>58 %  </p>
                                </div>

                                <div className=' flex flex-wrap items-center gap-2 mt-3 '>
                                    <div className='badge badge-outline badge-sm '> <span>todo</span> <span>3</span> </div>
                                    <div className='badge badge-outline badge-sm '> <span>inprogress</span> <span>3</span> </div>
                                    <div className='badge badge-outline badge-sm '> <span>done</span> <span>3</span> </div>
                                    <div className='badge badge-outline badge-sm '> <span>blocked</span> <span>3</span> </div>
                                </div>



                            </div>
                        )
                    })
                }
            </div>

            <pre className='text-xs tracking-widest'>
                {JSON.stringify(reqData, null, 10)}
            </pre>

        </div>
    )
}

export default Page
