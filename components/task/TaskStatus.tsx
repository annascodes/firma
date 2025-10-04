import React from 'react'
import BasicIcons from '../BasicIcons'


type Status = "TODO" | "IN_PROGRESS" | "DONE" | "BLOCKED"


const TaskStatus = ({ status }: { status: Status }) => {
    const label = status as 'TODO' | 'IN_PROGRESS' | 'DONE' | 'BLOCKED'
    let whichStatus = 'badge-info'
    if (status === 'TODO')
        whichStatus = 'badge-info'
    if (status === 'IN_PROGRESS')
        whichStatus = 'badge-warning'
    if (status === 'DONE')
        whichStatus = 'badge-success'
    if (status === 'BLOCKED')
        whichStatus = 'badge-error'
    return (
        <div className={`flex items-center gap-2 badge badge-soft ${whichStatus}  `}>
            {status === 'DONE' &&  <BasicIcons label={label}  />}
           

            <p className='text-xs tracking-wider'>{status==='IN_PROGRESS' ? 'IN PROGRESS': status}</p>


        </div>
    )
}

export default TaskStatus
