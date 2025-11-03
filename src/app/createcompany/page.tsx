'use client'
import React from 'react'
import CreateCompanyForm from '../../../components/company/CreateCompanyForm'
import { useUser } from '@clerk/nextjs'

const Page = () => {
    const { user } = useUser()
    const userId: string = user?.id ? user.id : '';

    return (
        <div>
            {/* <CreateCompanyForm ownerId={userId} /> */}
        </div>
    )
}

export default Page
