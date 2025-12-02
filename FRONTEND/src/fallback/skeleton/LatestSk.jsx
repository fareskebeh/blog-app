import { MdErrorOutline, MdOutlineQuestionMark } from "react-icons/md"

const LatestSk = ({status}) => {
  return(
    <div className='**:transition duration-150  relative h-90 flex justify-between gap-8 p-8 *:flex-1'>
      {
        Array.from({length:3}, (_,i)=> (
          <div className={`transition duration-150 rounded-4xl bg-neutral-300 dark:bg-neutral-800 ${status==='loading' && 'animate-pulse'}`} key={i}>

          </div>
        ))
      }

      {
        status!=='success' &&
          <div className={`bg-neutral-100/70 dark:bg-neutral-950/70 absolute flex items-center gap-4 dark:text-neutral-400 text-neutral-600 justify-center flex-col inset-0`}>
              {
                status==='error' ? <MdErrorOutline color="#ff4040" size={36}/>:
                status==='empty'&& <MdOutlineQuestionMark color="#cccc00" size={36}/>
              }
              <p>
                {
                  status==="error" ? "Could not get posts, Try again":
                  status==="empty" && "No posts found, Perhaps I need inspiration?"
                }
              </p>
          </div>
      }

    </div>

    
  )
}

export default LatestSk