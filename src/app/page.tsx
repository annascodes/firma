// 'use client'
// import { useUser } from "@clerk/nextjs";

import { auth, currentUser } from "@clerk/nextjs/server";
import BasicIcons from "../../components/BasicIcons";



export default async function Home() {
  // const { user } = useUser()
  // const {userId} = await  auth()
  const authUser = await auth()
  const clerkUser = await currentUser()
  return (
    <div>

      <BasicIcons label='info' showFullLog={true} />

      {/* <pre className=" text-xs tracking-widest">
        {JSON.stringify(user, null, 10)}
      </pre> */}
      <pre className=" text-xs text-amber-700 tracking-widest">
        authUser:
        {JSON.stringify(authUser, null, 10)}
      </pre>
      <pre className=" text-xs text-emerald-800 tracking-widest">
        clerkUser:
        {JSON.stringify(clerkUser, null, 10)}
      </pre>

    </div>
  );
}
