import React from 'react'
import SidebarCompany from './SidebarCompany'
import BasicIcons from 'components/BasicIcons'
import { Company, Department, Project } from '@prisma/client'

type DepartmentWithRelations = Department & {
  projects: Project[]
}
type CompanyWithRelations = Company & {
  departments: DepartmentWithRelations[]
}

type PropType = {
    company: CompanyWithRelations;
     handleAddDepart?: (data: Department) =>void;
      handleSetData?: (proj: Project) => void;
}

const Drawer = ({company,handleAddDepart, handleSetData}:PropType) => {
    return (
        <div>
            <div className="drawer">
                <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-1" className="btn drawer-button">
                        <BasicIcons label='sidebar' />
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 min-h-full w-80 p-4 pt-28">
                       <SidebarCompany company={company}  handleSetData={handleSetData} handleAddDepart={handleAddDepart} />
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Drawer
