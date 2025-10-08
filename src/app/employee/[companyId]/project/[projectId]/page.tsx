'use client'
import FullProjectPage from 'components/project/FullProjectPage'
import React, { use } from 'react'

type PropType = {
    params: Promise<{projectId: string}>
}
const Page = ({params}:PropType) => {
    const {projectId} = use(params)
  return (
    <div>
        project id <br />
        {projectId}

        <FullProjectPage projectId={projectId}  />
       
    </div>
  )
}

export default Page
