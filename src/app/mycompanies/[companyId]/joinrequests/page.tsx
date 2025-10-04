'use client'
import React, { use, useEffect, useState } from 'react'
import HeadingTag from '../../../../../components/HeadingTag'
import { useApiReq } from '../../../../../lib/hooks/useApiReq'
import type { CompanyJoinRequest, User } from '@prisma/client'
import moment from 'moment'
import JoinReqRespModal from '../../../../../components/company/JoinReqRespModal'
import { useDispatch } from 'react-redux'
import { setPendingJoinReqs } from '../../../../../lib/redux/companySlice'
import { useSelector } from 'react-redux'
import { RootState } from 'lib/redux/store'

type PropType = {
  params: Promise<{ companyId: string }>
}

type CompanyJoinReqWithRelations = CompanyJoinRequest & {
  user: User;
}

const Page = ({ params }: PropType) => {

  const { companyId } = use(params)
  const {pendingJoinReqs} = useSelector((state:RootState)=>state.company)
  const [joinReqs, setJoinReqs] = useState<CompanyJoinReqWithRelations[]>([])
  const [status, setStatus] = useState('PENDING')
  const dispatch = useDispatch()

  const { request, data, loading, error } = useApiReq<CompanyJoinReqWithRelations[]>()
  useEffect(() => {
    request(`/api/company/${companyId}/joinrequests?status=${status}`)

  }, [])
  useEffect(() => {
    if (data ) {
      setJoinReqs(data)
      if(data.length>0 && data[0].status === 'PENDING')
         dispatch(setPendingJoinReqs(data.length)) // DISPATCH ONLY PENDING REQUESTS 

        
     
    }

  }, [data])
  const handleFetchRequests = (fetchStatus: string)=>{
    setStatus(fetchStatus)
    request(`/api/company/${companyId}/joinrequests?status=${fetchStatus}`)
  }
  return (
    <div>
     <div className='flex items-center gap-2'>
       <HeadingTag heading='Join requests' />
      {loading && <span className='loading loading-spinner loading-sm'></span>}
     </div>

      <div className='flex justify-center gap-3 my-5'>
        <button onClick={()=>handleFetchRequests('PENDING')} className={`btn btn-neutral ${status === 'PENDING' &&'btn-active'}  btn-outline btn-sm`}>Pending <span className=''>( {pendingJoinReqs} )</span> </button>

        <button  onClick={()=>handleFetchRequests('APPROVED')}  className={`btn btn-neutral ${status === 'APPROVED' &&'btn-active'}  btn-outline btn-sm`}>Approved</button>
        <button onClick={()=>handleFetchRequests('REJECTED')} className={`btn btn-neutral ${status === 'REJECTED' &&'btn-active'}  btn-outline btn-sm`}>Rejected</button>
        
      </div>

      {(!loading && joinReqs.length ===0) && <p className='text-center mt-20 text-sm tracking-widest opacity-50'>No request under {status} status </p> }

      <div className='flex flex-col gap-2 '>
        {
          joinReqs.map(r => {
            return (
              <div className='p-5 rounded-xl border border-neutral-300 flex justify-between items-center'>
               <div>
                 <h1 className='flex items-center gap-2'>
                  <span className='text-xs opacity-30'>request by</span>
                  <span> {r.user.email} </span>
                </h1>
                <h1 className='flex items-center gap-2'>
                  <span className='text-xs opacity-30'>posted </span>
                  <span> {moment(r.createdAt).fromNow()} </span>
                </h1>
               </div>


               <div>
                <JoinReqRespModal key={r.id} joinReq={r} />
               </div>
              </div>
            )
          })
        }
      </div>




      <pre className='text-xs tracking-widest'>
        joinReqs:
        {JSON.stringify(joinReqs, null, 10)}
      </pre>

    </div>
  )
}

export default Page
