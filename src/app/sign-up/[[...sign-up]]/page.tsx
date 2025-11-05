import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return <div className=' flex flex-col gap-4 items-center justify-center'>
      <h1 className='md:text-4xl md:font-extrabold text-center'>Sign-Up page</h1>
      <SignUp />
    </div>
}

