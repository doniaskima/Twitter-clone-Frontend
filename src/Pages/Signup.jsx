import {useAuth} from "../Context/authProvider";
import {Input , Label} from "../components/FormComponents";
import { useState } from "react";
 

const Signup = () => {
  const { signupUserWithCredentials } = useAuth();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const signupHandler = async (event) => {
    event.preventDefault();
  }
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