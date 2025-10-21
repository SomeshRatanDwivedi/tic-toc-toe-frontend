import { io, Socket } from "socket.io-client";
import { BASE_URL } from "./constants/api.constant";

export const socket: Socket = io(BASE_URL); // replace with deployed server
