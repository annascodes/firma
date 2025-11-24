import BasicIcons from 'components/BasicIcons'
import { LandingPagefeatures } from 'lib/hardData'
import React from 'react'


type FeatureIcon = 'plus' | 'company' | 'handShake' | 'department' | 'project' | 'task';

const Features = () => {
    const featureIcons: FeatureIcon[][] = [
        ['company'],
        ['handShake'],
        ['department', 'project'],
        ['task']
    ]

    return (
       <div className='h-svh flex justify-center items-center'>
         <div>
           
            <h1 className="text-5xl text-center font-extrabold mb-6  "> Features</h1>
            <div className="flex items-center gap-3 flex-wrap justify-center">
                {LandingPagefeatures.map((f, indx) => {
                    return (
                        <div key={f.title} className="card bg-base-100  w-96 shadow-xl">

                            {/* <div>
                                    {featureIcons.map((iList, outerIndex) => (
                                        <div key={outerIndex}>
                                            {iList.map((icon, innerIndex) => {
                                                // const fIcon = icon as ''
                                                return(
                                                <div key={innerIndex}>
                                                    <BasicIcons label={icon} />
                                                </div>
                                            )
                                            })}
                                        </div>
                                    ))}
                                </div>
  */}


                            <div className="card-body border-0 py-2 items-center text-center">
                                <div className='border-0  p-2 flex items-center gap-5 justify-center '>
                                    {featureIcons[indx].map((icon, outerindex) =>
                                    (
                                        <div key={outerindex}>
                                            <BasicIcons label={icon} size='text-3xl' />
                                        </div>
                                    )
                                    )}
                                </div>
                                <h2 className="card-title">{f.title}</h2>
                                <p>{f.desc}</p>
                                <div className="card-actions">
                                    {/* <button className="btn btn-outline btn-neutral">Buy Now</button> */}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
       </div>
    )
}

export default Features
