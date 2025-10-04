import React from 'react'
import HeadingTag from '../../../components/HeadingTag'
import CreateDepartmentForm from '../../../components/department/CreateDepartmentForm'

const Page = () => {
  return (
    <div>
       <HeadingTag heading='Create Department' center={true} />
    
    <CreateDepartmentForm />

      
    </div>
  )
}

export default Page
