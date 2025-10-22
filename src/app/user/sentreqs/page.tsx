'use client'
import React, { useEffect, useState } from 'react'
import HeadingTag from '../../../../components/HeadingTag'
import { useApiReq } from '../../../../lib/hooks/useApiReq';
import type { Company, CompanyJoinRequest } from '@prisma/client';
import moment from 'moment';
import BasicIcons from '../../../../components/BasicIcons';
import DeletePermit from '../../../../components/DeletePermit';

type CompanyJoinRequestWithRelations = CompanyJoinRequest & {
  company: Company;
}

const Page = () => {
  const [sentReqs, setSentReqs] = useState<CompanyJoinRequestWithRelations[]>([])
  const { request, data, loading, error } = useApiReq<CompanyJoinRequestWithRelations[]>()

  useEffect(() => {
    request(`/api/companyjoinreq/`)

  }, [])

  useEffect(() => {
    if (data) {
      setSentReqs(data)
    }
  }, [data])

  return (
    <div>
      <HeadingTag heading='Your sent requests' />
      {loading && <span className='loading loading-spinner loading-xl'></span>}


      <div className='flex flex-col gap-3 mt-5'>
        {sentReqs.map(r => {
          return (
            <div key={r.id} className='border border-neutral-400 p-3 rounded-xl flex justify-between items-center '>
              <div className='flex flex-col gap-2'>
                <h1 className='flex items-center gap-1 font-bold'> <BasicIcons label='company' /> {r.company.name} </h1>
                <p className='text-sm'> <span className='text-xs text-green-400'>SENT </span> {moment(r.createdAt).fromNow()}</p>
              </div>

             
                <div className='flex items-center gap-1'> 
                  {/* <span className='text-xs'>status </span>  */}
                  <p className='badge badge-neutral'>{r.status}</p>  
                  <DeletePermit id={r.id} />
                </div>
              



            </div>

          )
        })}

      </div>

      <pre className='text-xs tracking-widest'>
        sentReqs:
        {JSON.stringify(sentReqs, null, 10)}
      </pre>

    </div>
  )
}

export default Page
