import './App.css';
import { useEffect } from "react";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch } from "react-redux";
import { setUserFromLocalStorage } from "./features/user/userSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUserFromLocalStorage);
  }, []);

  return (
    <div className="App h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute />}>
          <Route path="/home" element={<Home/>}/>
        </Route>
      </Routes>
    </div>
  );

}

export default App;