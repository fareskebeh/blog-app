import React from 'react'

const Toggle = () => {
  return (
    <div className='flex gap-2'>
        <input className='peer' type="checkbox" hidden id="checkbox" />
        <label htmlFor='checkbox' className={`h-6 w-10 peer-checked:before:translate-x-4 peer-checked:dark:bg-blue-500 rounded-xl before:transition transition duration-150 relative before:content-[''] before:h-4 before:w-4 before:absolute before:rounded-xl before:bg-white before:top-1 before:left-1 bg-neutral-200 dark:bg-neutral-900 cursor-pointer`}>

        </label>
    </div>
  )
}

export default Toggle