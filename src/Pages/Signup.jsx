import { useAuth } from "../Context/authProvider";
import {Input , Label} from "../components/FormComponents";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
 

const Signup = () => {

 
  const { signupUserWithCredentials, validateEmail } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const matchPassword = confirmPassword === password ;
  const isPasswordValid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(
    password
  );

  const signupHandler = async (event) => {
    event.preventDefault();
    setError("");
    if (
      name === "" || username === "" || email === "" || password === "" || confirmPassword === ""
    ) {
      setError("All fields are required!");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!isPasswordValid) {
      setError("Password must be 8 characters long , have one upper and lower case character and one number");
      return;
    }
    if (!matchPassword) {
      setError("Both passwords must be same");
      return;
    }
    setLoading(true);
    const { message, success } = await signupUserWithCredentials(
      username,
      name,
      email,
      password
    );
  };
 

  return (
    <div className="h-screen flex justify-center">
      <div className="text-center mt-40">
        <h1 className="text-5xl font-semibold mb-4">Twitter Clone</h1>
        <div className="bg-gray-200 p-4 text-left rounded-md">
          <form onSubmit={signupHandler}>
            <div>
              <Label htmlFor="name" LabelText="Name" id="name-input-title" />
              <Input
                value={name}
                id="name"
                placeholder="Name"
                ariaLabelledBy="name-input-title"
                callback={setName}
              />
            </div>
            <div>
            <Label htmlFor="username" LabelText="Username" id="username-input-title" />
            <Input
                value={username}
                id="username"
                placeholder="Username"
                ariaLabelledBy="username-input-title"
                callback={setUsername}
              /> 
            </div>
            <div>
              <Label htmlFor="password" id="password-input-title" LabelText="Password" />
              <Input id="password" value={password} placeholder="Password" ariaLabelledBy="password-input-title" callback={setPassword} />
            </div>
            <div>
            <Label htmlFor="confirmPassword" id="confirmPassword-input-title" LabelText="Confirm Password" />
            <Input id="confirmPassword" value={confirmPassword} placeholder="Password" ariaLabelledBy="password-input-title" callback={setConfirmPassword} />
            </div>
            <button type="submit">Signup</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup