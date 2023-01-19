import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/BaseUrl";
import { Input, Label } from "../components/FormComponents";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { signupUserAsync } from "../features/user/userSlice";
import Twittercute from "../assets/Twittercute.png";

const Signup = () => {

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, errorMessage } = useSelector((state) => state.user);
  const matchPassword = confirmPassword === password;

  const isPasswordValid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(
    password
  );
  const signupHandler = async (event) => {
    event.preventDefault();
    setError("");
    if (
      name === "" ||
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setError("All fields are required!");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!isPasswordValid) {
      setError(
        "Password must be 8 characters long, have one upper and lower case character and one number."
      );
      return;
    }
    if (!matchPassword) {
      setError("Both passwords must be same");
      return;
    }
    const { meta } = await dispatch(
      signupUserAsync({
        username,
        name,
        email,
        password,
      })
    );
    if (meta.requestStatus === "fulfilled") {
      navigate("/home");
    }
  }
  return (
    <div className="h-screen flex justify-center bg-gradient-to-r from-blue-500 to-purple-700 z-1 filter ">
      <div className="text-center mt-4">
        <div className="flex justify-center">
          <img className="w-16 mb-4" src={Twittercute} alt="LogoTwitter" />
        </div>
        <h1 className="text-4xl font-semibold mb-4 font-mono text-white">
          Join Twitter today
        </h1>
        {error !== "" && (
          <p className="text-red-600 font-meduim max-w-sm">{error}</p>
        )}
        {errorMessage !== "" && (
          <p className="text-red-600 font-medium max-w-sm">{errorMessage}</p>
        )}

        <div className="bg-white p-4 text-left rounded-xl mt-1 shadow-lg">
          <form onSubmit={signupHandler}>
            <div>
              <Label htmlFor="name" labelText="Name" id="name-input-title"></Label>
              <Input
                value={name}
                id="name"
                placeholder="Name"
                ariaLabelledBy="name-input-title"
                callback={setName} />
            </div>
            <div>
              <Label
                htmlFor="username"
                labelText="Username"
                id="username-input-title"
              />
              <Input
                id="username"
                placeholder="Username"
                ariaLabelledBy="username-input-title"
                value={username}
                callback={setUsername}
              />
            </div>
            <div>
              <Label htmlFor="email" labelText="Email" id="email-input-title" />
              <Input
                callback={setEmail}
                placeholder="Email"
                value={email}
                id="email"
                ariaLabelledBy="email-input-title"
              />
            </div>
            <div>
              <Label
                htmlFor="password"
                id="password-input-title"
                labelText="Password"
              />
              <div className="border-2 border-gray-400 bg-white rounded-md flex items-center">
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
                  id="password"
                  value={password}
                  type={showPassword ? "text" : "password"}
                  className="bg-transparent rounded-md w-11/12 p-2 focus:outline-none"
                  aria-labelledby="password-input-title"
                />
                {showPassword ? (
                  <AiOutlineEyeInvisible
                    onClick={() => setShowPassword(false)}
                    className="text-2xl cursor-pointer"
                  />
                ) : (
                  <AiOutlineEye
                    onClick={() => setShowPassword(true)}
                    className="text-2xl cursor-pointer"
                  />
                )}
              </div>
            </div>
            <div>
              <Label
                htmlFor="confirmPassword"
                id="confirmPassword-input-title"
                labelText="Confirm Password"
              />
              <Input
                placeholder="Password"
                id="confirmPassword"
                ariaLabelledBy="confirmPassword-input-title"
                value={confirmPassword}
                callback={setConfirmPassword}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-3 py-2 rounded-md mt-2 w-36 font-semibold shadow-md"
              >
                {!loading ? "Signup" : "Signing In..."}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup