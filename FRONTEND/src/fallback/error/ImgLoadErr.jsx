import { MdErrorOutline } from "react-icons/md";

const ImgLoadErr = () => {
  return (
    <div className="w-full h-40 dark:text-neutral-500 text-neutral-500 **:transition duration-150 rounded-3xl flex flex-col items-center justify-center dark:bg-neutral-800 bg-neutral-100">
        <MdErrorOutline color="#ff4040" size={36}/>
        <p>Could not load image, Try again</p>
    </div>
  )
}

export default ImgLoadErr