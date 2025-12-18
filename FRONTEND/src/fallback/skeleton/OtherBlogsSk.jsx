
const OtherBlogsSk = () => {
  return (
    <div className=" **:transition-colors relative duration-150 py-4">
        <div className="flex flex-col gap-2 *:animate-pulse">
        {
            Array.from({length: 2} ,(_,i)=> (
                <div key={i} className="h-25 w-full dark:bg-neutral-900 bg-neutral-200 rounded-2xl"></div>
            ))
        }
        </div>

        <div className="flex items-center justify-center absolute inset-0 bg-linear-to-t dark:from-neutral-950 dark:via-neutral-950/60 from-white rounded-4xl">
        </div>

    </div>
  )
}

export default OtherBlogsSk