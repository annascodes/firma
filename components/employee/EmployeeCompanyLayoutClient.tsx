'use client'
import { Company, Department, Project } from '@prisma/client'
import { useApiReq } from 'lib/hooks/useApiReq'
import React, { useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import EmployeeSideBar from './EmployeeSideBar'
import EmployeeDrawer from './EmployeeDrawer'

type PropType = {
  children: React.ReactNode,
  companyId: string
}
type DepartmentsWithRelations = Department & {
  projects: Project[];
  company: Company;
}
type ReqType = {
  company: Company;
  departments: DepartmentsWithRelations[]
}
const EmployeeCompanyLayoutClient = ({ children, companyId }: PropType) => {
  const isLarge = useMediaQuery('(min-width: 1024px)')
  const { request, data, loading, error } = useApiReq<ReqType>()

  useEffect(() => {

    request(`/api/employed/${companyId}`)
  }, [])
  return (
    <div>

      <div className='flex flex-col lg:flex-row'>
        {isLarge
          ? <div className='w-3/12 flex flex-col sticky h-svh overflow-auto  p-3'>
            {/* desktop  */}
            {loading && <span className='loading loading-dots'></span> }
            {data &&
              <EmployeeSideBar data={data.departments} company={data.company} />
            }
          </div>
          : <div className=''>
            {/* mobile  */}
             {loading && <button className='btn btn-soft '>
              <span className='loading loading-dots'></span>
             </button> }
            {
              data &&
              <EmployeeDrawer data={data?.departments} company={data?.company} />
            }
          </div>
        }
        <div className='lg:w-9/12 w-full p-3'>
          {children}
        </div>
      </div>




    </div>
  )
}

export default EmployeeCompanyLayoutClient
