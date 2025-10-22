import React from 'react'


type LayoutPropTypes = {
    children: React.ReactNode
}
const Layout = async ({ children }: LayoutPropTypes) => {
 

    return (
        <div>
            {children}
        </div>
    )
}

export default Layout