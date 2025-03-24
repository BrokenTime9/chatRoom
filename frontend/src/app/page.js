"use client";
import { useEffect, useState } from "react";
import useRoomStore from "@/store/room/roomStore";
import axios from "axios";
import Rooms from "@/components/rooms";
import Chat from "@/components/chat";
import Dashboard from "@/components/dashboard";

export default function ChatApp() {
  const { initSocketListeners, fetchInitialData, activeRoom, currentUser } =
    useRoomStore();

  useEffect(() => {
    fetchInitialData();
    initSocketListeners();
  }, []);

  console.log(currentUser);
  return (
    <div className="h-[100dvh] bg-primarybg-dark flex p-4">
      <Dashboard />
    </div>
  );
}
