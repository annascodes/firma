import { LandingPagefeatures } from 'lib/hardData'
import React from 'react'

const ImgSlider = () => {
     
   
    return (
        
            <div className="carousel carousel-end rounded-box md:w-full w-sm h-72 border-4 border-dashed">

                
                {
                    LandingPagefeatures.map(f => {
                        return (
                            <div key={f.title} className="carousel-item   md:w-xl w-sm  m-2">
                                 <img
                                    src={f.img}
                                    className='h-full w-full object-cover rounded-xl'
                                    alt="Drink" />
                            </div>
                        )
                    })
                }


            </div>
 
    )
}

export default ImgSlider
