import {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import {useAuth} from "../Context/authProvider";


const Login = () => {
  const { loginUserWithCredentials, validateEmail } = useAuth();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
  }

  return (
    <div className="h-screen flex justify-center">
      <div className="text-center mt-40">
        <h1 className="text-5xl font-semibold mb-4">Twitter Clone</h1>
        <p className="text-red-50 font-medium">{error}</p>
        <div className="text-left shadow-lg w-96 p-4 bg-gray-200 rounded-md mt-2 ">
          <form onSubmit={(e) => {
            loginHandler(e);
          }}>
            <div className="">
              <label htmlFor="email" className="font-semibold">Email</label>
              <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Your Email" id="email" className="border-2 border-gray-400 rounded-md w-full p-2 my-2" />
              
            </div>
            <div>
              <label htmlFor="password" className="font-semibold">Password</label>
              <div className="border-2 border-gray-400 bg-white rounded-md flex-items-centered">
                <input type="text" id="password" placeholder="Enter your password" value={password} className="bg-transparent rounded-md w-11/12 p-2 focus:outline-none" />
                {
                  showPassword ? (
                    <i
                    className="fa fa-eye-slash cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  ></i>
                  ) : (
                    <i
                    className="fa fa-eye cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  ></i>
                  )
                }
             </div>
            </div>
            <div className="flex justify-center md-4">
              <button
                type="submit"
                disabled={email === "" || password === ""}
                className="bg-blue-500 text-white px-3 py-2 rounded-md my-2 w-36 font-semibold"
              >
                {!loading ? "Login" : "Logging In.."}
             </button>
            </div>
          </form>
          <div className="text-center">

          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Login