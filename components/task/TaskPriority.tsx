import React from 'react'
import BasicIcons from '../BasicIcons'


type Priority = "HIGH" | "NORMAL" | "LOW"


const TaskPriority = ({priority}:{priority: Priority}) => {
    const label = priority.toLowerCase() as 'high' | 'normal' | 'low'
    let whichBadge = 'badge-neutral'
    if(priority.toLocaleLowerCase() === 'high')
        whichBadge= 'badge-error'
    if(priority.toLocaleLowerCase() === 'normal')
        whichBadge= 'badge-warning'
    if(priority.toLocaleLowerCase() === 'low')
        whichBadge= 'badge-success'
  return (
    <div className={`flex items-center gap-2 badge ${whichBadge} text-white`}>

        <BasicIcons label={label} /> 

        <p className='text-xs tracking-wider'>{priority}</p>
        {/* <p className='text-xs lowercase opacity-70'>priority</p> */}

      
    </div>
  )
}

export default TaskPriority
