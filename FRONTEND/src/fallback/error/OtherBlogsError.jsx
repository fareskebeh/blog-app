import { MdErrorOutline } from "react-icons/md"

const OtherBlogsError = () => {
  return (
    <div className="relative **:transition-colors duration-150 py-4">
        <div className="flex flex-col gap-2">
        {
            Array.from({length: 2} ,(_,i)=> (
                <div key={i} className="h-25 w-full dark:bg-neutral-900 bg-neutral-200 rounded-2xl"></div>
            ))
        }
        </div>
        <div className="flex items-center justify-center absolute inset-0 bg-linear-to-t dark:from-neutral-950 dark:via-neutral-950/60 from-white rounded-4xl">
            <div className="w-full gap-4 h-40 dark:text-neutral-500 text-neutral-500 **:transition-colors duration-150 rounded-3xl flex flex-col items-center justify-center">
                <MdErrorOutline color="#ff4040" size={36}/>
                <p>Could not load posts, Try again</p>
            </div>
        </div>

    </div>
  )
}

export default OtherBlogsError