'use client'
import type { Company } from '@prisma/client'
import CompanyDisplayCard from 'components/company/CompanyDisplayCard'
import JoinCompany from 'components/company/JoinCompany'
import { useApiReq } from 'lib/hooks/useApiReq'
import React, { useEffect } from 'react'

const Page = () => {
    const { request, data, loading, error } = useApiReq<Company[]>()
    useEffect(() => {
        request(`/api/company`, 'GET')
    }, [])
    return (
        <div className='p-10'>
            <h1 className='text-center text-4xl  mb-5 '>Your companies  {loading && <span className='loading loading-spinner '></span>} </h1>

            <div className='flex flex-row flex-wrap justify-start items-center gap-3 my-5'>
                {
                    data && data.map((d: Company, i: number) => {
                        return (
                            <CompanyDisplayCard key={d.id} company={d} />
                        )
                    })
                }

            </div>


            {error && <pre className='text-red-500 tracking-widest'>{JSON.stringify(error, null, 10)}</pre>}

            {
                // (data && data.length ===0 ) && 
                <div className='flex justify-center gap-4'>
                    <button className='btn btn-outline text-base tracking-widest btn-xl'>Create a company</button>
                    {/* <button className='btn btn-dash  text-base tracking-widest btn-xl'>Join company</button> */}

                    <JoinCompany/>

                </div>
            }

            <pre className='text-[10px] tracking-widest mt-10'>
                {JSON.stringify(data, null, 10)}
            </pre>



        </div>
    )
}

export default Page
