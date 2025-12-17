import React from 'react'

export default function ParagraphSk ({status}) {
  const widths = ['w-1/2', 'w-3/4', 'w-full'];
  const randWidth = () => widths[Math.floor(Math.random() * widths.length)];


  
  return (
    <div className='flex flex-col gap-4 my-8'>
      {
        Array.from({length:6}, (_,i)=> (
          <div className={`transition duration-150 h-10 ${randWidth()} rounded-4xl bg-neutral-300 dark:bg-neutral-800 ${status==='loading' && 'animate-pulse'}`} key={i}>

          </div>
        ))
      }
    </div>
  )
}
