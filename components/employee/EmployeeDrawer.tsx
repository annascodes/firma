import { Company, Department, Project } from '@prisma/client';
import BasicIcons from 'components/BasicIcons';
import React from 'react'
import EmployeeSideBar from './EmployeeSideBar';

type PropType = {
    // companyId: string;
    company: Company;
    data: DepartmentsWithRelations[];
}
type DepartmentsWithRelations = Department & {
    projects: Project[];
    company: Company;
}

const EmployeeDrawer = ({ data, company }: PropType) => {
    return (
        <div>

            <div>
                <div className="drawer">
                    <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-1" className="btn drawer-button">
                            <BasicIcons label='sidebar' />
                            employee
                        </label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 min-h-full w-80 p-4 pt-28">
                           <EmployeeSideBar data={data} company={company} />
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EmployeeDrawer
