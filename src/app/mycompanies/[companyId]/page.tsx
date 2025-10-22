'use client'
import React, { use } from 'react'
import type { CompanyJoinRequest } from "@prisma/client"
import { useEffect } from "react"
import { useApiReq } from './../../../../lib/hooks/useApiReq'
import { useDispatch } from 'react-redux'
import { setPendingJoinReqs } from './../../../../lib/redux/companySlice'
import { useSelector } from 'react-redux'
import type { RootState } from "./../../../../lib/redux/store";



type PropType = {
  params: Promise<{ companyId: string }>
}
const Page = ({ params }: PropType) => {
  const { companyId } = use(params)
  const dispatch = useDispatch()
  // const {pendingJoinReqs} = useSelector(state=>state.company)
  const { pendingJoinReqs } = useSelector((state: RootState) => state.company);

  const { request, data, loading, error } = useApiReq<CompanyJoinRequest[]>()
  useEffect(() => {
    request(`/api/company/${companyId}/joinrequests?status=PENDING`)

  }, [])

  useEffect(() => {
    if (data) {
      dispatch(setPendingJoinReqs(data.length))
    }
  }, [data])
  return (
    <div>
     <h1 className='text-xs tracking-widest my-2'> app\mycompanies\[companyId]\page.tsx </h1>

    </div>
  )
}

export default Page
