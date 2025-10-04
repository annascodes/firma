'use client'
import React, { useEffect, useState } from 'react'
import HeadingTag from '../HeadingTag'
import { useApiReq } from '../../lib/hooks/useApiReq'
import type { Company } from '@prisma/client'
import type { Department } from '@prisma/client'

type selectCompType = {
    CompanyName: string;
    CompanyId: string;
}

const CreateDepartmentForm = () => {
    const [departName, setDepartName] = useState<string | null>(null)
    const [selectedComp, setSelectedComp] = useState<selectCompType | null>(null)
    const { request, data, loading, error } = useApiReq<Company[]>()
    const { request: departReq, data: departData, loading: departLoading, error: departError } = useApiReq<Department>()

    useEffect(() => {
        request(`/api/company`, 'GET')
    }, [])
    const handleCreateDepartment = () => {
        console.log('creating department: ', { departName, ...selectedComp })
        if (!departName || departName === '' || !selectedComp) {
            alert('Need name and company both')
            return
        }
        departReq(`/api/department`, 'POST', { departName, ...selectedComp })
    }

    return (
        <div className='border border-neutral-400 p-5 rounded-2xl w-sm mx-auto my-10 flex flex-col gap-3'>

            {error &&
                <pre className='text-xs text-red-400'>
                    error:
                    {JSON.stringify(error, null, 10)}
                </pre>
            }


            {departError &&
                <pre className='text-xs text-red-400'>
                    departError:
                    {JSON.stringify(departError, null, 10)}
                </pre>
            }



            <fieldset className="fieldset">
                <legend className="fieldset-legend">What's the name of department?</legend>
                <input onChange={(e) => { setDepartName(e.target.value) }} value={departName ?? ''} type="text" className="input w-full" placeholder="department name" />
                {/* <p className="label">Optional</p> */}
            </fieldset>


            <fieldset className="fieldset">
                <legend className="fieldset-legend">Select one of your company</legend>
                {loading
                    ? <div className="skeleton h-14 w-full"></div>
                    : <select defaultValue="Pick a color" className="select w-full">
                        <option onClick={(e) => setSelectedComp(null)} >Select company</option>
                        {
                            data && data.map((c: Company, i: number) => {
                                return (
                                    <option
                                        onClick={(e) => setSelectedComp({ CompanyName: c.name, CompanyId: c.id })}
                                        value={c.name}
                                        key={c.id}
                                    >
                                        {c.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                }
            </fieldset>

            <button disabled={departLoading || departName === null || selectedComp === null} onClick={handleCreateDepartment} className='btn btn-primary  w-full'>
                {departLoading ? <span className='loading loading-spinner'></span> : ' Create Department'}
            </button>



            {departData &&
                <pre className='text-xs tracking-widest'>
                    departData :
                    {JSON.stringify(departData, null, 10)}
                </pre>
            }




        </div>
    )
}

export default CreateDepartmentForm
