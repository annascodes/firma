"use client";

import { useEffect, useState } from "react";
import { useApiReq } from "../../lib/hooks/useApiReq";

interface CreateCompanyFormProps {
  ownerId: string; // Pass this from the parent (logged-in user)
}

export default function CreateCompanyForm({ ownerId }: CreateCompanyFormProps) {
  const [CompanyName, setCompanyName] = useState("");

  const { request, data, loading, error } = useApiReq()


  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(CompanyName)
    request(`/api/company`, 'POST', { name: CompanyName })

  };


  return (
    <div>
      <div className="w-sm p-2 mx-auto flex flex-col gap-5">
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
