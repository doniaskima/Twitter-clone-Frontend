import socketio from "socket.io-client";
import { BaseUrl } from "../utils/BaseUrl";
import React, { useContext } from "react";


export const socket = socketio(BaseUrl);
export const SocketContext = React.createContext();
export const useSocket = () => useContext(SocketContext);