import React from 'react'
import { db } from '../../../../lib/db';
import { auth } from '@clerk/nextjs/server';
import CompanySidebar from '../../../../components/company/CompanySidebar';
type LayoutPropTypes = {
  params: { companyId: string };
  children: React.ReactNode;
}
const Layout = async ({ children, params }: LayoutPropTypes) => {
  const { companyId } = await params;
  // const { userId } = await auth()
  // let currentUser;
  // if (userId) {
  //   currentUser = await db.user.findUnique({ where: { clerkId: userId } })
  // }


  // const company = await db.company.findUnique({
  //   where: {
  //     id: companyId,
  //     ownerId: currentUser?.id
  //   },
  //   include: {
  //     departments: true
  //   }
  // })
  // if (!company) return <div className='h-svh flex flex-row justify-center items-center'>
  //   <span className='text-4xl font-extrabold opacity-40'>Company not found</span> </div>

  return (
    <div>

      <div className='flex'>
        <div className='w-3/12 hidden lg:flex border-r-2  p-3'>
          <CompanySidebar companyId={companyId} />
        </div>
        <div className='lg:w-9/12 w-full  p-3'>{children}</div>
      </div>




      <div className="divider divider-neutral">  [companId]/layout.tsx </div>




    </div>
  )
}

export default Layout
