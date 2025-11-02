import EmployeeCompanyLayoutClient from 'components/employee/EmployeeCompanyLayoutClient';
import React from 'react'
type PropType = {
    children: React.ReactNode;
    params: Promise<{ companyId: string }>
}

const layout = async ({ children, params }: PropType) => {
    const { companyId } = await params;
    return (
        <EmployeeCompanyLayoutClient companyId={companyId}>
            {children}
        </EmployeeCompanyLayoutClient>
    )
}

export default layout
