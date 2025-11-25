'use client'

import type { Company, Department, Project } from '@prisma/client'
import { useApiReq } from 'lib/hooks/useApiReq'
import React, { use, useEffect } from 'react'

type PropType = {
  params: Promise<{ companyId: string }>
}

type DepartmentWithRelations = Department & {
  projects: Project[]
}

type CompanyWithRelations = Company & {
  departments: DepartmentWithRelations[]
}

const Page = ({ params }: PropType) => {
  const { companyId } = use(params);
  const { request, data, loading, error } = useApiReq<CompanyWithRelations>()


  useEffect(() => {
    request(`/api/company/${companyId}`)
  }, [])
  return (
    <div>
      {/* <h1 className='tracking-widest text-xs'>companies/[companyId]/page.tsx</h1> */}
      {
        data && <div>
         
          <h1 className='text-6xl text-center font-extrabold '>{data.name}</h1>
           <h1 className='text-center' > Overview   </h1>

        </div>
      }
      {/* <pre>
        {JSON.stringify(data, null, 10)}
      </pre> */}
    </div>
  )
}

export default Page
