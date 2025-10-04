import Link from 'next/link'
import React from 'react'
type PropType = {
    children: React.ReactNode
}

const layout = ({children}:PropType) => {
  return (
    <div>
        <div className='flex justify-center gap-3 mb-5'>
            <Link href={'/user/sentreqs'}  className='btn btn-outline btn-xs'> Sent requests </Link>
            <Link href={''} className='btn btn-outline btn-xs'> Memberships </Link>
        </div>

        {children}
      
    </div>
  )
}

export default layout
