import CompanyLayoutClient from 'components/company_/CompanyLayoutClient'
import React from 'react'


type LayoutPropTypes = {
    params: Promise<{ companyId: string }>
    children: React.ReactNode
}
const Layout = async ({ children, params }: LayoutPropTypes) => {
    const { companyId } = await params

    // you could fetch company info here if needed
    // const company = await db.company.findUnique({ where: { id: companyId } })

    return (
        <CompanyLayoutClient companyId={companyId}>
            {children}
        </CompanyLayoutClient>
    )
}

export default Layout