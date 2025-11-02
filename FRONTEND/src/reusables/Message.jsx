import { AnimatePresence, motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";

const Message = ({
  shown,
  status,
  message,
}) => {
  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          initial={{opacity:0, x:-50}}
          animate={{opacity:1, x:0}}
          exit={{opacity:0, x:-50}}
          transition={{duration:0.15}}
          className="fixed bottom-12 left-12 dark:bg-neutral-900 dark:text-white flex items-center gap-2 bg-neutral-200 shadow-md rounded-xl  p-4 border dark:border-black border-neutral-300"
        >
          {status === "error" ? (
            <FaRegCircleXmark color="#ad2e24" size={22} />
          ) : (
            <FaCheckCircle color="#0e7d0e" size={22} />
          )}
          <p>{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Message;
