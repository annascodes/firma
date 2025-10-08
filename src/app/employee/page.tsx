'use client'
import HeadingTag from 'components/HeadingTag'
import { useApiReq } from 'lib/hooks/useApiReq'
import React, { useEffect } from 'react'
import type { CompanyMembership, Company } from '@prisma/client'
import BasicIcons from 'components/BasicIcons'
import Link from 'next/link'
import moment from 'moment'

type CompanyMembershipWithRelations = CompanyMembership & {
  company: Company
}

const Page = () => {
  const { request, data, loading, error } = useApiReq<CompanyMembershipWithRelations[]>()

  useEffect(() => {
    request(`/api/employed`)

  }, [])
  return (
    <div>
      <h1 className='text-center opacity-50 text-3xl font-extrabold tracking-wider'>Companies you are employed in</h1>

      <div className='flex flex-row flex-wrap justify-center gap-2 items-center my-5'>
        {data && data.map(d => {

          const role = d.role.toLowerCase() as 'admin' | 'manager' | 'guest' | 'member' | 'owner'
          return (
            <Link href={`employee/${d.companyId}`} className='hover:bg-blue-50 hover:border-blue-50 duration-200 border-4 border-neutral-200 p-3 rounded-xl w-xs'>
            <div className='flex justify-between items-center '>
                <span className=' opacity-50 text-xs tracking-widests'>Employed in </span>
                <BasicIcons label='arrowRight' />
            </div>
              <div  className='flex items-center gap-2'>
                <BasicIcons label='company' />
                <h1 className='text-2xl font-extrabold'>{d.company.name}</h1>
              </div>
              <div  className='flex items-center gap-2  mt-5'>
                <span  className='opacity-50 text-xs tracking-widest'>role</span>
                <h1 className='badge badge-neutral  tracking-widest'>{d.role}</h1>
              </div>
              <div  className='flex items-center gap-2  mt-2'>
                <span  className='opacity-50 text-xs tracking-widest'>joined</span>
                <h1 className='text-sm'>{moment(d.createdAt).format('ddd, Do MMMM YYYY')}</h1>
              </div>
            </Link>
          )
        })}

      </div>
      <pre className='text-xs tracking-widest'>
        {JSON.stringify(data, null, 10)}
      </pre>

    </div>
  )
}

export default Page
