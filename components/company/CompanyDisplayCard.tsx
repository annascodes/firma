import React from 'react'
import BasicIcons from '../BasicIcons'
import type { Company } from '@prisma/client'
import type { Department } from '@prisma/client'
import type { User } from '@prisma/client'
import type { Project } from '@prisma/client'
import type { CompanyMembership } from '@prisma/client'
import Link from 'next/link'

type PropTypes = {
    company: Company;
    department?: Department;
}
type CompanyWithRelations = Company & {
    owner: User
    departments: Department[]
    projects: Project[]
    members: CompanyMembership[]
}

const CompanyDisplayCard = ({ company }: { company: Company }) => {
    const SignleCompany = company as CompanyWithRelations;


    return (
        <div className='border border-neutral-200 p-5 rounded-3xl w-sm'>

            <h1 className='text-sm opacity-40'>company</h1>
            <h1 className='text-4xl font-extrabold flex gap-2 items-center flex-wrap '>
                 <BasicIcons label='company' size='text-3xl' /> {company.name}</h1>
                 <Link className='text-blue-500 underline-offset-4 underline text-xs' href={`/mycompanies/${company.id}`}>visit</Link>
            <div className=' h-52  mt-5 bg-neutral-50 rounded-2xl p-2 overflow-auto'>

                <span className='text-xs opacity-40'>departments</span>
                <div className='flex flex-wrap items-center gap-2 p'>
                    {  (company && SignleCompany.departments.length ===0) && <span className='text-xs tracking-widest text-center  mx-auto'>no department yet</span> }
                    {
                        company && SignleCompany.departments.map((d: Department, i: number) => {
                            return (
                                <Link href={`/department/${d.id}`} className='btn btn-ghost btn-sm flex items-center gap-2'> <BasicIcons label='department' /> {d.name}  </Link>
                            )
                        })
                    }
                </div>
                <span className='text-xs opacity-40'>projects</span>
                <div  className='flex flex-wrap items-center gap-2 p'>
                      {  (company && SignleCompany.projects.length ===0) && <span className='text-xs tracking-widest text-center  mx-auto'>no projects yet</span> }
                    {
                        company && SignleCompany.projects.map((p: Project, i: number) => {
                            return (
                                <Link href={`/project/${p.id}`} className={`btn btn-ghost btn-sm flex items-center gap-1`}> <BasicIcons  label='project' />{ p.name}</Link>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default CompanyDisplayCard


