import { io, Socket } from "socket.io-client";
import { API_BASE_URL } from "./constants/api.constant";

export const socket: Socket = io(API_BASE_URL); // replace with deployed server
