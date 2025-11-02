import React from 'react'
import BasicIcons from '../BasicIcons'
import type { Company } from '@prisma/client'
import type { Department } from '@prisma/client'
import type { User } from '@prisma/client'
import type { Project } from '@prisma/client'
import type { CompanyMembership } from '@prisma/client'
import Link from 'next/link'
import moment from 'moment'
import ManageCompanyModal from 'components/company_/ManageCompanyModal'

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
        <div className='border-4 border-neutral-200 md:p-3 p-2 md:rounded-xl rounded-xl w-sm'>

            <div className='flex justify-between items-center mb-2'>
                <h1 className='text-xs tracking-widest opacity-40 '>company</h1>
                <div className='flex items-start  gap-2'>
                    <Link href={`/companies/${company.id}/manage`} className='tooltip hover:bg-blue-50 rounded-lg p-1' data-tip='Manage company'>
                        <BasicIcons label='settings' />
                    </Link>
                    {/* <ManageCompanyModal company={company} /> */}
                   <button>
                     <Link href={`/companies/${company.id}`} 
                     className='tooltip hover:bg-blue-50 rounded-lg p-1'
                     data-tip='Visit company'>
                        <BasicIcons label='arrowRight' />
                    </Link>
                   </button>
                </div>
            </div>
            <Link
                href={`/companies/${company.id}`}
                className='md:text-2xl font-extrabold flex gap-2 items-center flex-wrap'
            >
                <BasicIcons label='company' size='text-3xl' />
                <p>{company.name}</p>
            </Link>

            <div className='flex items-center gap-2 my-2 '>
                <p className='opacity-50 text-xs tracking-widest '>created</p>
                <h1 className='text-sm'>{moment(company.createdAt).format('ddd, Do MMMM YYYY')} </h1>
            </div>

        </div>
    )
}

export default CompanyDisplayCard


