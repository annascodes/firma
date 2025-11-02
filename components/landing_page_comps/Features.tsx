import React from 'react'

const Features = () => {
    return (
        <div>
            <div className='md:w-6xl mx-auto    '>
                <h1 className='md:text-4xl font-semibold mb-2'>Features</h1>
            </div>
            <div className="flex items-center justify-center   flex-wrap gap-2 mb-5 ">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="card bg-base-100 w-96 shadow-sm border-2 border-neutral-400">
                        <div className="card-body">
                            <h2 className="card-title">Card Title {i + 1}</h2>
                            <p>
                                A card component has a figure, a body part, and inside body there are title and actions parts.
                            </p>
                        </div>
                        <figure>
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
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
