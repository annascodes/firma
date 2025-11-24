// 'use client'
// import { useUser } from "@clerk/nextjs";

import { auth, currentUser } from "@clerk/nextjs/server";
import BasicIcons from "../../components/BasicIcons";
import Hero from "components/Hero";
import Features from "components/landing_page_comps/Features";
import ImgSlider from "components/ImgSlider";
import { LandingPagefeatures } from '../../lib/hardData';
import ImgScroll from "components/ImgScroll";



export default async function Home() {
  // const { user } = useUser()
  // const {userId} = await  auth()
  const authUser = await auth()
  const clerkUser = await currentUser()
  return (
    <div className="">


      {/* <ImgScroll/> */}
      <Hero />


      <div className="flex justify-center">
        <div className="carousel carousel-center bg-neutral rounded-box max-w-3xl mx-auto border-0 border-yellow-300 space-x-4 p-4">
          {
            LandingPagefeatures.map(f => {
              return (
                <div className="carousel-item w-lg">
                  <img
                    src={f.img}
                    className=" rounded-box object-cover" />
                </div>
              )
            })
          }


        </div>
      </div>

      <Features />








      {/* <BasicIcons label='info' showFullLog={true} /> */}

      {/* <pre className=" text-xs tracking-widest">
        {JSON.stringify(user, null, 10)}
      </pre> */}
      {/* <pre className=" text-xs text-amber-700 tracking-widest">
        authUser:
        {JSON.stringify(authUser, null, 10)}
      </pre>
      <pre className=" text-xs text-emerald-800 tracking-widest">
        clerkUser:
        {JSON.stringify(clerkUser, null, 10)}
      </pre> */}

    </div>
  );
}
