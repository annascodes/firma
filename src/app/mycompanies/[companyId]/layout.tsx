import React from 'react'
import { db } from '../../../../lib/db';
import { auth } from '@clerk/nextjs/server';
import CompanySidebar from '../../../../components/company/CompanySidebar';
import CompSidebarDrawer from 'components/company/CompSidebarDrawer';

type LayoutPropTypes = {
  params:Promise<{companyId: string }> ;
  children: React.ReactNode;
}
const Layout = async ({ children, params }: LayoutPropTypes) => {
  const { companyId } = await params;


  return (

    <div>



      <div className='flex flex-col lg:flex-row'>

        <div className='w-3/12 hidden lg:flex lg:flex-col border-r-2  p-3'>

          <div>
            <CompanySidebar key={`sidebarWithoutDrawer`} companyId={companyId} />
          </div>

        </div>

        <div className='lg:w-9/12 w-full  p-3'>

          <CompSidebarDrawer key={`sidebarInDrawer`} companyId={companyId} />


          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
