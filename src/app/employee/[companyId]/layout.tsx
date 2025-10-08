import EmployeeSideBar from 'components/employee/EmployeeSideBar';
import React from 'react'
type PropType = {
    children: React.ReactNode;
    params:  {companyId: string}
}

const layout = async ({children, params}:PropType) => {
    const {companyId} = await params;
  return (
    <div className='flex  w-full'>
        <div className='w-3/12  p-2'>
            <EmployeeSideBar companyId={companyId} />
        </div>
        <div className='w-9/12  '>
            {children}
        </div>
      
    </div>
  )
}

export default layout
