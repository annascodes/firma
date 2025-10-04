import React from 'react'
type PropType = {
    heading:string;
    center?:boolean;
    size?: string;
    font?: string;

}

const HeadingTag = ({heading='', center=false, size='text-4xl', font='font-extrabold'}:PropType) => {
  return (
    <div>
      <h1 className={`${size} ${font} ${center && 'text-center'} `}>{heading}</h1>
    </div>
  )
}

export default HeadingTag
