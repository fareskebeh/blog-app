import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";

const Message = ({
  response,
  setResponse
}) => {
    
    useEffect(()=> {
        const autohide = ()=> {
            setResponse({
                ...response,
                shown: false
            })
        }

        if(response.shown&&response.status!=="loading") {
            setTimeout(autohide,3000)
        }
    },[response.shown, response.message])

  return (
    <AnimatePresence>
      {response.shown && (
        <motion.div
          initial={{opacity:0, x:-50}}
          animate={{opacity:1, x:0}}
          exit={{opacity:0, x:-50}}
          transition={{duration:0.15}}
          className="fixed bottom-12 left-12 justify-center transition-colors duration-150 dark:bg-neutral-900 dark:text-white flex items-center gap-2 bg-neutral-200 shadow-md rounded-xl  p-4 border dark:border-black border-neutral-300"
        >
          {response.status === "error" ? (
            <FaRegCircleXmark color="#ad2e24" size={22} />
          ) : response.status==="success" ? (
            <FaCheckCircle color="#0e7d0e" size={22} />
          ) : <div className="loader-2 w-5 my-1 dark:dark"/>
        }
        {
            response.message && <p>{response.message}</p>
        }
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Message;
