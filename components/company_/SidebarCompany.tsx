'use client'
import { Company, Department, Project } from '@prisma/client'
import BasicIcons from 'components/BasicIcons'
import CreateDepartmentModal from 'components/department/CreateDepartmentModal'
import AddProjectModal from 'components/project/AddProjectModal'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import ManageCompanyModal from './ManageCompanyModal'
import CompanyInfoModal from 'components/CompanyInfoModal'

type DepartmentWithRelations = Department & {
  projects: Project[]
}


type CompanyWithRelations = Company & {
  departments: DepartmentWithRelations[]
}
type PropType = {
  company: CompanyWithRelations;
  handleSetData?: (proj: Project) => void;
  handleAddDepart?: (data: Department) => void
}

const SidebarCompany = ({ company, handleSetData, handleAddDepart }: PropType) => {

  const pathName = usePathname()

  const tempHandle = (proj: Project) => {
    console.log('--tempHandel--')
    console.log(proj)
  }



  return (
    <div className=''>

      <div className='flex items-center flex-wrap gap-2 justify-start'>
        {/* <BasicIcons label='company' />
        <p className='text-xl font-bold '>{company.name}</p> */}
        <CompanyInfoModal companyId={company.id} companyName={company.name} />
        <CreateDepartmentModal companyId={company.id} companyName={company.name} handleAddDepartToExistingArr={handleAddDepart} />
      </div>
      <div className='mt-5 flex flex-col gap-1 justify-start'>
        <Link href={`/companies/${company.id}`} className='flex items-center gap-2  btn btn-soft  btn-info hover:text-white text-black justify-start'>
          <BasicIcons label='gridView' />
          Overview
        </Link>
        <Link href={`/companies/${company.id}/joinrequests`} className='flex items-center gap-2 btn btn-soft btn-info hover:text-white text-black justify-start'>
          <BasicIcons label='joinReq' />
          Join Requests
        </Link>
        <Link href={`/companies/${company.id}/users`} className='flex items-center gap-2 btn btn-soft btn-info hover:text-white text-black justify-start'>
          <BasicIcons label='users' />
          All Users
        </Link>
        <Link href={`/companies/${company.id}/manage`} className='flex items-center gap-2 btn btn-soft btn-info  hover:text-white text-black justify-start'>
          <BasicIcons label='settings' />
          Manage company
        </Link>
      </div>


      <div className='divider divider-neutral text-xs opacity-60 my-5'>departments</div>

      {company.departments.map(d => {
        return (
          <div key={d.id} className='my-3'>
            <div className='flex items-center justify-between  flex-wrap gap-1'>
              <div className='flex items-center flex-wrap gap-1'>
                <div  className='flex items-center gap-1 btn btn-soft justify-start'>
                  <BasicIcons label='department' />
                  <p>{d.name}</p>
                </div>
                <AddProjectModal
                  departmentId={d.id}
                  companyId={company.id}
                  handleSetData={handleSetData || tempHandle}
                  justIcon={true}
                />
              </div>

              <ManageCompanyModal  department={d} />

            </div>

            {d.projects.length === 0 &&
              <p className='text-center text-xs opacity-40 tracking-widest my-2'>no project</p>
            }

            {d.projects.map(p => {
              return (
                <Link key={p.id} href={`/companies/${company.id}/${d.id}/project/${p.id}`}
                  className={`flex items-center my-1  gap-1 ml-4 text-sm btn btn-sm btn-neutral btn-outline justify-start border-none 
                  ${pathName === `/companies/${company.id}/${d.id}/project/${p.id}` && 'btn-active'}`}>
                  <BasicIcons label='project' />
                  <p>{p.name}</p>
                </Link>
              )
            })}

          </div>
        )
      })}
    </div>
  )
}

export default SidebarCompany
