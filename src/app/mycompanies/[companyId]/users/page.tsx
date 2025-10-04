'use client'
import React, { use, useEffect } from 'react'
import HeadingTag from '../../../../../components/HeadingTag'  
import AddUser from '../../../../../components/user/AddUser'

type TypeProp = {
  params: Promise<{companyId:string}>
}

const Page = ({params}: TypeProp) => {
  const {companyId} = use(params);

  useEffect(()=>{
    if(companyId)
    {
      console.log('Then fetch user of this company')
    }


  },[])
  return (
    <div>
        <div className='flex justify-between items-center '>
            <HeadingTag heading='Users' />
            <AddUser companyId={companyId} />
        </div>
      
    </div>
  )
}

export default Page
