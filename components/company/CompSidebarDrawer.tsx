import React from 'react'
import CompanySidebar from './CompanySidebar'
import BasicIcons from 'components/BasicIcons'


type PropType = {
    companyId : string
}

const CompSidebarDrawer = ({companyId}:PropType) => {
    return (
        <div className=''>
            <div className="drawer">
                <input id="my-drawer-CompSidebarDrawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-CompSidebarDrawer" className="btn btn-ghost btn-sm">
                        <BasicIcons label='sidebar' />
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-CompSidebarDrawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 pt-16  ">
                       <CompanySidebar key={'sidebarWithoutDrawer'} companyId={companyId}  />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CompSidebarDrawer
