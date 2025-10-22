'use client'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { upload } from "@vercel/blob/client";
import { Attachment } from '@prisma/client';
type PropType = {
    taskId?: string;
    projectId?: string;
    setAttachments?: Dispatch<SetStateAction<Attachment[]>>
}
const AttachmentUploader = ({ taskId, projectId, setAttachments }: PropType) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null)
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);


    const handleUpload = async () => {
        const file = inputRef.current?.files?.[0];
        if (!file) {
            alert('No file here!!!')
            return
        }

        setUploading(true)
        setError(null)
        try {
            //  Upload directly to Vercel Blob via your API route
            const blob = await upload(file.name, file,
                {
                    access: 'public',
                    handleUploadUrl: '/api/blob/upload'
                }
            )
            //  Save metadata to your DB
            
            if (taskId) {
                const res = await fetch(`/api/task/${taskId}/attachments`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(
                            {
                                name: file.name,
                                mime: file.type,
                                size: file.size,
                                url: blob.url,
                            }
                        )
                    }
                )
                if (!res.ok) throw new Error("Metadata save failed");


                 const data = (await res.json()) as { attachment: Attachment };
                setUploadedUrl(blob.url)
                if (setAttachments) {
                    setAttachments((prev) => {
                        if (!prev) return [data.attachment];
                        return [...prev, data.attachment ]
                    })
                }
            }

        } catch (error) {
            console.error('error in catch: ', error)
            setError("Error in uploading. Try again.")

        } finally {
            setUploading(false)
        }
    }
    return (
        <div>
            <span>upload attachments</span>
            <div className="flex items-center gap-3">

                <input
                    ref={inputRef}
                    type="file"
                    className="file-input file-input-bordered w-full"
                />
                <button
                    onClick={handleUpload}
                    className="btn btn-neutral"
                    disabled={uploading}
                >
                    {uploading ? <span className='loading loading-dots'></span> : "Upload"}
                </button>
                {/* {uploadedUrl && (
                    <a
                        href={uploadedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link link-primary text-sm"
                    >
                        {uploadedUrl}
                    </a>
                )} */}
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

        </div>
    )
}

export default AttachmentUploader
