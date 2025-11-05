import { LandingPagefeatures } from 'lib/hardData'
import React from 'react'
const Features = () => {

    return (
        <div>
            {/* <div className='md:w-6xl mx-auto '>
                <h1 className='md:text-4xl text-2xl font-semibold mb-2'>Features</h1>
            </div> */}
              <h1 className='md:text-4xl text-2xl font-semibold mb-2'>Features</h1>
            <div className="flex items-center justify-center flex-wrap gap-2 mb-5 ">
                {LandingPagefeatures.map((f, i) => (
                    <div key={i} className="hover:scale-125 duration-500 hover:z-50 card w-96 shadow-sm border-dashed border-0 bg-stone-200">
                        <div className="card-body">
                            <h2 className="card-title">{f.title}</h2>
                            <p>
                                {f.desc}
                            </p>
                        </div>
                        <figure className='border-0  rounded-2xl m-2  h-52'>
                            <img
                                src={f.img}
                                className='w-full h-full object-cover rounded-xl'
                                alt="Shoes"
                            />
                        </figure>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Features
