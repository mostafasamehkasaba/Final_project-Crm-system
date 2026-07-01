"use client";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io("https://back-end-crm-project.vercel.app", {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("✅ Connected", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.log("❌ Socket Error", err.message);
    });
  }

  return socket;
};
export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = getSocket();

    return () => {
      // لا نغلق الاتصال لأنه Shared
    };
  }, []);

  return socketRef.current;
};