'use client'
import React, { use, useEffect, useState } from 'react'
import HeadingTag from '../../../../../components/HeadingTag'
import AddUser from '../../../../../components/user/AddUser'
import { useApiReq } from 'lib/hooks/useApiReq'
import type { CompanyMembership, User } from '@prisma/client'
import CompanyMemberShipRoleModal from 'components/company/CompanyMemberShipRoleModal'
import InvitationLetter from 'components/user/InvitationLetter'

type TypeProp = {
  params: Promise<{ companyId: string }>
}

type CompanyMembershipWithRelations = CompanyMembership & {
  user: User;
}

const Page = ({ params }: TypeProp) => {
  const { companyId } = use(params);
  const [compUsers, setCompUsers] = useState<CompanyMembershipWithRelations[]>([])
  const { request, data, loading, error } = useApiReq<CompanyMembershipWithRelations[]>()


  useEffect(() => {
    if (companyId)
      request(`/api/company/${companyId}/companymembership`)

  }, [companyId])

  useEffect(() => {
    if (data) setCompUsers(data)
  }, [data])

  return (
    <div>
      <div className='flex justify-between items-center '>
        <HeadingTag heading='Users' />
        {loading && <span className='loading loading-spinner '></span>}
        {/* <AddUser companyId={companyId} /> */}
        <InvitationLetter/>
      </div>

      {/* ----------------------- */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>

              <th></th>
              <th>User</th>
              <th>Recent Projs</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {compUsers.map((u, i) => {
              return (
                <tr key={u.id}>
                  <td>
                    {++i}

                  </td>

                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={u.user.image || ''}
                            alt={`${u.user.email}-profile-pic`} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{u.user.email}</div>
                        <div className="text-sm opacity-50">{u.user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    Zemlak, Daniel and Leannon
                    <br />
                    <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                  </td>
                  <td>
                    <CompanyMemberShipRoleModal
                      id={u.id}
                      role={u.role}
                      email={u.user.email || 'n/a'}
                    />
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>

              )
            })}


          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* --------------------------- */}

      <pre className='text-xs tracking-widest'>
        compUsers:
        {JSON.stringify(compUsers, null, 10)}
      </pre>

    </div>
  )
}

export default Page
