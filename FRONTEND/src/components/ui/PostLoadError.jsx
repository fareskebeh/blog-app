import { MdErrorOutline } from "react-icons/md";

const PostLoadError = () => {
  return (
    <div className="w-full h-60 dark:text-neutral-500 text-neutral-500 **:transition-colors duration-150 rounded-3xl flex flex-col items-center justify-center dark:bg-neutral-900 bg-neutral-200">
        <MdErrorOutline color="#ff4040" size={36}/>
        <p>Could not get posts, Try again</p>
    </div>
  )
}

export default PostLoadError