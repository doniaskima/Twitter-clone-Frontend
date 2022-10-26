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
          
        </div>
        
      </div>
    </div>
  )
}

export default Login