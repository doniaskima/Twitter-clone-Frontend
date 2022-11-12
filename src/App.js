import './App.css';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import PrivateRoute from "./components/PrivateRoute"

function App() {

  return (
    <div className="App h-screen">
      <Router>
        <Login path="/" />
        <Signup path="signup" />
        <PrivateRoute component={Home} path="home" />
      </Router>
    </div>
  );

}

export default App;
