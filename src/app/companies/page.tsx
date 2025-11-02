'use client'
import type { Company } from '@prisma/client'
import CompanyDisplayCard from 'components/company/CompanyDisplayCard'
import JoinCompany from 'components/company/JoinCompany'
import CreateCompanyModal from 'components/company_/CreateCompanyModal'
import { useApiReq } from 'lib/hooks/useApiReq'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const { request, data: Company, loading, error } = useApiReq<Company[]>()
    const [data, setData] = useState<Company[]>()
    useEffect(() => {
        request(`/api/company`, 'GET')
    }, [])
    useEffect(() => {
        if (Company) {
            setData(Company)
        }
    }, [Company])
    const handleNewCompany = (newCompany: Company) => {
        console.log('Added a newly company:', newCompany?.name)
        setData((prev)=>{
            if(!prev) return prev;
            return[
                ...prev,
                newCompany
            ]
        })

    }
    return (
        <div className='p-10'>
            <div className='flex items-center flex-wrap justify-between'>
                <h1 className='text-center text-4xl  mb-5 '>Your companies  {loading && <span className='loading loading-spinner '></span>} </h1>

                <div className='flex items-center gap-2'>
                    <JoinCompany />
                    <CreateCompanyModal handleNewCompany={handleNewCompany}  />
                </div>

            </div>

            <div className='flex flex-row flex-wrap justify-center items-center gap-3 my-5'>
                {
                    data && data.map((d: Company, i: number) => {
                        return (
                            <CompanyDisplayCard key={d.id} company={d} />
                        )
                    })
                }

            </div>


            {
                error &&
                <pre className='text-red-500 tracking-widest'>
                    {JSON.stringify(error, null, 10)}
                </pre>}





            <pre className='text-[10px] tracking-widest mt-10'>
                {JSON.stringify(data, null, 10)}
            </pre>



        </div>
    )
}

export default Page
