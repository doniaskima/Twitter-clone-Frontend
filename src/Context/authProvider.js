import axios from "axios";
import { createContext, useContext, useState } from "react";
import { BaseUrl } from "../utils/baseUrl";

export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

    const loginUserWithCredentials = async (email, password) => {
        try {
            const { data } = await axios.post(`${BaseUrl}/users/login`, { email, password });
            if (data.success) {
                setUser(data.user);
                setToken.apply(data.token);
                axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", JSON.stringify(data.token));
            }
            return { user: data.user, message: data.message, success: data.success };
        } catch (error) {
            console.log(error.message);
        }
    };

    const signupUserWithCredentials = async (username, name, email, password) => {
      try {
        const { data } = await axios.post(`${BaseUrl}/users/signup`, { username, name, email, password, });
        if (data.success) {
          setUser(data.user);
          setToken(data.token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", JSON.stringify(data.token));
        }
        return { user: data.user, message: data.message, success: data.success };
      } catch (error) {
        console.log(error.message);
      }
    }
    return (
    <AuthContext.Provider value={{ user, token, loginUserWithCredentials }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthProvider);
};