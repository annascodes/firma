import type { Attachment } from '@prisma/client'
import React from 'react'
import BasicIcons from './BasicIcons'
import moment from 'moment'
import Link from 'next/link'

const AttachmentFile = ({ attachment }: { attachment: Attachment }) => {
    let icon: 'pdf' | 'img' | 'txt' | 'doc' | 'docx' = 'txt';

    switch (attachment.mime) {
        case "image/*":
            icon = 'img'
            break;
        case "application/pdf":
            icon = 'pdf';
            break;
        case "text/plain":
            icon = 'txt';
            break;
        case "application/msword":
            icon = 'doc';
            break;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            icon = 'docx';
            break;
    }
    //  "image/*",
    //     "application/pdf",
    //     "text/plain",
    //     "application/msword",
    //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    return (
        <a
            href={attachment.url}
            target='_blank'
            className=' justify-center items-center  border border-neutral-300 p-2 rounded-xl hover:bg-blue-200 duration-200 hover:border-blue-200 flex flex-row gap-2 '>
            <BasicIcons label={icon} size='text-3xl' />
            <div>
                <p>{attachment.name}</p>
                <p className='text-xs opacity-60 tracking-widest'>{moment(attachment.createdAt).format('ddd, Do MMMM YYYY')}</p>
            </div>
        </a>
    )
}

export default AttachmentFile
