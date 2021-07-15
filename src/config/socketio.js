import io from "socket.io-client";
import { backendURL } from "./URL";

export const socket = io.connect(backendURL);
socket.on("connection", console.log("connected IO"));
