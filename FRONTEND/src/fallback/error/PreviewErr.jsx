import {FiRefreshCw} from "react-icons/fi"

const PreviewErr = () => {
  return (
    <div className='h-dvh flex items-center justify-center **:transitin duration-150'>
        <div className="flex flex-col items-center gap-4">
            <FiRefreshCw className="text-red-500" size={50}/>
            <p className='text-neutral-700 dark:text-neutral-400'>Error getting post, Reload to try again</p>
        </div>
    </div>
  )
}

export default PreviewErr