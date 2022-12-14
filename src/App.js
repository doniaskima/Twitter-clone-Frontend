import { useEffect } from "react";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Home,
  // Login,
  // Notification,
  // Signup,
  // Profile,
  // Messages,
  // PostInfo,
} from "./Pages/index";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Notification from "./Pages/Notification";
import PostInfo from "./Pages/PostInfo";
import Messages from "./Pages/Messages";
import Explore from "./Pages/Explore";
import Profile from "./Pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch } from "react-redux";
import { setUserFromLocalStorage } from "./features/user/userSlice";
import { socket, SocketContext } from "./SocketContext/socketContext";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUserFromLocalStorage);
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <div className="App h-screen">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="/explore" element={<PrivateRoute />}>
            <Route path="/explore" element={<Explore />} />
          </Route>
          <Route path="/notifications" element={<PrivateRoute />}>
            <Route path="/notifications" element={<Notification />} />
          </Route>
          <Route path="/profile/:userId" element={<PrivateRoute />}>
            <Route path="/profile/:userId" element={<Profile />} />
          </Route>
          <Route path="/messages" element={<PrivateRoute />}>
            <Route path="/messages" element={<Messages />} />
          </Route>
          <Route path="/post/:postId" element={<PrivateRoute />}>
            <Route path="/post/:postId" element={<PostInfo />} />
          </Route>
        </Routes>
      </div>
    </SocketContext.Provider>
  );

}

export default App;