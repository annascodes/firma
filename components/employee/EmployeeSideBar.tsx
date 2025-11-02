'use client'
import { useApiReq } from 'lib/hooks/useApiReq';
import React, { useEffect } from 'react'
import type { Company, Department, Project } from '@prisma/client';
import BasicIcons from 'components/BasicIcons';
import HeadingTag from 'components/HeadingTag';
import Link from 'next/link';


type PropType = {
    // companyId: string;
    company: Company;
    data: DepartmentsWithRelations[];
}
type DepartmentsWithRelations = Department & {
    projects: Project[];
    company: Company;
}

const EmployeeSideBar = ({ data, company }: PropType) => {
    // const { request, data, loading, error } = useApiReq<DepartmentsWithRelations[]>()

    // useEffect(() => {

    //     request(`/api/employed/${companyId}`)
    // }, [])
    // const companyName = (data && data.length > 0) && data[0].company.name || ''
    return (
        <div className='  border-r '>
            <div className='flex items-center gap-2 flex-wrap  mb-5'>
                <BasicIcons label='company' />
                <HeadingTag heading={company.name} />
                {false && <span className='loading loading-spinner'></span>}
                <span className='badge badge-secondary text-xs tracking-widest'>employed  </span>
            </div>



            <div className='flex flex-col gap-2 items-start'>
                {data && data.map(d => {
                    return (
                        <div key={d.id} className=''>

                            <button className='btn btn-soft'>
                                <BasicIcons label='department' />
                                {d.name}
                            </button>


                            <div className=' mt-2 mb-5 flex flex-col items-start gap-1'>
                                {d.projects.map(p => {
                                    return (
                                        <Link
                                            key={p.id}
                                            href={`/employee/${p.companyId}/project/${p.id}`}
                                            className='ml-5 btn btn-outline btn-neutral border-none btn-sm'>
                                            <BasicIcons label='project' />
                                            {p.name}
                                        </Link>

                                    )
                                })}
                            </div>

                        </div>
                    )
                })}
            </div>

            {/* 
             <pre className='text-[10px] tracking-widest'>
                {JSON.stringify(data, null, 10)}
            </pre> */}



        </div>
    )
}

export default EmployeeSideBar


/* 
want to fetch projects user is employeed() in 

*/