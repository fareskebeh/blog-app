import { FaRegPaperPlane, FaRegCheckCircle } from "react-icons/fa"
import { Link } from "react-router-dom"

const Verify = () => {
  return (
    <div className='h-dvh pt-20 flex flex-col **:transition duration-150 justify-center items-center'>
        <div className="flex items-center mt-auto gap-12 flex-col md:flex-row">
            <FaRegPaperPlane size={80} className="dark:text-neutral-600 text-neutral-400"/>

            <div className="space-y-2">
                <p className="text-2xl font-black dark:text-white">Verify your Email</p>
                <p className="text-lg text-neutral-700 dark:text-neutral-600">Check your inbox and click the link to verify your account</p>
            </div>
        </div>

        <Link className="mt-auto mb-20 flex gap-2 items-center text-neutral-500 dark:text-neutral-700" to="/login-with-email"><FaRegCheckCircle/> Verified? Back to Login</Link>
    </div>
  )
}

export default Verify