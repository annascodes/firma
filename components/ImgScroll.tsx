import { LandingPagefeatures } from 'lib/hardData'
import React from 'react'

const ImgScroll = () => {
    return (
        <div className="relative w-full overflow-hidden">
            <div className="flex animate-scroll gap-4">
                {/* Duplicate your features array twice for seamless looping */}
                {[...LandingPagefeatures, ...LandingPagefeatures].map((f, i) => (
                    <img
                        key={i}
                        src={f.img}
                        alt={f.title}
                        className="h-40 w-auto rounded-2xl object-cover"
                    />
                ))}
            </div>
        </div>

    )
}

export default ImgScroll
