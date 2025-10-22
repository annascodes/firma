'use client'

import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import SidebarCompany from './SidebarCompany'
import Drawer from './Drawer'
import { useApiReq } from 'lib/hooks/useApiReq'
import type { Company, Department, Project } from '@prisma/client'
import BasicIcons from 'components/BasicIcons'


type PropType = {
  companyId: string
  children: React.ReactNode
}
type DepartmentWithRelations = Department & {
  projects: Project[]
}

type CompanyWithRelations = Company & {
  departments: DepartmentWithRelations[]
}
const CompanyLayoutClient = ({ companyId, children }: PropType) => {
  const isLarge = useMediaQuery('(min-width: 1024px)')
  const { request, data, loading, error } = useApiReq<CompanyWithRelations>()
  const [departments, setDepartments] = useState<DepartmentWithRelations[]>()
  const [company, setCompany] = useState<CompanyWithRelations>()

  useEffect(() => {
    request(`/api/company/${companyId}`)
  }, [])
  useEffect(() => {
    if (data) {
      setDepartments(data.departments)
      setCompany(data)
    }
  }, [data])

  const handleSetData = (proj: Project) => {
    console.log(`--Acutal handleSetData--`)
    console.log(proj)
    setCompany((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        departments: prev.departments.map(d => {
          if (d.id === proj.departmentId) {
            return { ...d, projects: [...d.projects, proj] }
          }
          else {
            return d
          }
        })
      }
    })
  }
  const handleAddDepart = (depart: Department) => {
    const newDepart = { ...depart, projects: [] }
    setCompany((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        departments: [newDepart, ...prev.departments]
      }
    })
  }

  return (
    <div>

      <div className='flex flex-col lg:flex-row'>
        {isLarge ? (
          // 🖥️ Desktop Sidebar
          <div className='w-3/12 flex flex-col sticky h-svh overflow-auto  p-3'>
            {company && <SidebarCompany company={company} handleSetData={handleSetData} handleAddDepart={handleAddDepart} />}
          </div>
        ) : (
          // 📱 Mobile Drawer Sidebar
          <div className='w-full p-3'>
            {
              company && <Drawer company={company} handleAddDepart={handleAddDepart} handleSetData={handleSetData} />
            }
          </div>
        )}

        <div className='lg:w-9/12 w-full p-3'>
          {loading && <div className='skeleton h-14 w-sm'></div>}
          {error && <pre>{JSON.stringify(error, null, 10)}</pre>}
          {/* <pre className='text-xs tracking-widest'>
            data:
            {JSON.stringify(data, null, 10)}
          </pre> */}
          {children}
        </div>
      </div>
    </div>
  )
}

export default CompanyLayoutClient
// neon error id:  32de71b587ce43279efcda84c25c8276