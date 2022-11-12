import './App.css';
import {BrowserRouter as Router,Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {
  return (
    <div className="App h-screen">
      <Router>
        <Login path="/" />
        <Signup path="signup" />
      </Router>
    </div>
  );
}


export default App;
