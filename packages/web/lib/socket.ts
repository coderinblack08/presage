import { createContext } from "react";
import socketio, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { API_URL } from "./constants";

export const socket = socketio(API_URL, { withCredentials: true });
export const SocketContext = createContext<Socket<
  DefaultEventsMap,
  DefaultEventsMap
> | null>(null);
