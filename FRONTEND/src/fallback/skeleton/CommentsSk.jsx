
const CommentsSk = () => {
  return (
    <div className='py-4 relative flex **:transition-colors duration-150 overflow-y-hidden flex-col gap-4'>
        {
            Array.from({length:3}, (_,i)=> (
                <div key={i} className='h-20 rounded-xl dark:bg-neutral-800 bg-neutral-300 animate-pulse'>

                </div>
            ))
        }
        <div className='absolute bg-linear-to-t  from-neutral-200 dark:from-neutral-900 to-transparent inset-0'>

        </div>
    </div>
  )
}

export default CommentsSk