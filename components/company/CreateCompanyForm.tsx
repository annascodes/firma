"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useApiReq } from "../../lib/hooks/useApiReq";
import type { Company } from "@prisma/client";

interface CreateCompanyFormProps {
  ownerId: string; // Pass this from the parent (logged-in user)
  handleNewCompany: (data: Company) => void;
  setLoading: Dispatch<SetStateAction<boolean>>
}

export default function CreateCompanyForm({ ownerId, handleNewCompany, setLoading }: CreateCompanyFormProps) {
  const [CompanyName, setCompanyName] = useState("");

  const { request, data, loading, error } = useApiReq()


  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(CompanyName)
    request(`/api/company`, 'POST', { name: CompanyName })

  };

  useEffect(() => {
    if (data) {
      handleNewCompany(data as Company)
    }
  }, [data])
  useEffect(() => {
    setLoading(loading)
  }, [loading])


  return (
    <div>
      <div className=" p-2 mx-auto flex flex-col gap-5">
        <h1 className='text-3xl font-bold'>Create Company </h1>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Name of you company</legend>
          <input onChange={(e) => { setCompanyName(e.target.value) }} type="text" className="input w-full" placeholder="Type here" />
          {/* <p className="label">Optional</p> */}
        </fieldset>
        <button disabled={loading} onClick={handleCreateCompany} className="btn btn-neutral btn-outline w-full ">
          {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Create'}
        </button>

      </div>
      <pre className="text-xs tracking-widest">
        {JSON.stringify(data, null, 10)}
      </pre>
    </div>
  );
}
