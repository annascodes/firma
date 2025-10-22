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
            <Link  href={`/companies/${company.id}`} className=' hover:underline underline-offset-8 text-4xl font-extrabold flex gap-2 items-center flex-wrap '>
                <BasicIcons label='company' size='text-3xl' /> {company.name}
            </Link>
           
        </div>
    )
}

export default CompanyDisplayCard


