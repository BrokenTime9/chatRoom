"use client";
import { useEffect, useState } from "react";
import useRoomStore from "@/store/room/roomStore";
import axios from "axios";

export default function ChatApp() {
  const {
    rooms,
    messages,
    activeRoom,
    activeUsers,
    initSocketListeners,
    fetchInitialData,
    createRoom,
    joinRoom,
    sendMessage,
  } = useRoomStore();
  const [roomInput, setRoomInput] = useState("");
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    fetchInitialData();
    initSocketListeners();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold">Chat Rooms</h1>

      <h1 className="text-3xl font-bold">{activeUsers}</h1>

      {/* Room Creation */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={roomInput}
          onChange={(e) => setRoomInput(e.target.value)}
          placeholder="Enter room name"
          className="px-3 py-2 bg-gray-800 border border-gray-700 rounded"
        />

        <button
          onClick={() => {
            if (roomInput) {
              createRoom(roomInput);
              setRoomInput("");
            }
          }}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
        >
          Create Room
        </button>
      </div>

      {/* Room List */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Available Rooms:</h2>
        <ul>
          {rooms.map((room) => (
            <li key={room} className="mt-2">
              <button
                onClick={() => joinRoom(room)}
                className={`px-4 py-2 rounded ${
                  activeRoom === room ? "bg-green-600" : "bg-gray-700"
                } hover:bg-gray-600`}
              >
                {room}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {activeRoom && (
        <div className="mt-8 w-full max-w-md bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Room: {activeRoom}</h2>
          <div className="h-64 overflow-y-auto bg-gray-700 p-2 rounded mt-2">
            {messages[activeRoom]?.map((msg, index) => (
              <div key={index} className="mt-1">
                <strong>{msg.sender}:</strong> {msg.text}
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message..."
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded w-full"
            />
            <button
              onClick={() => {
                if (messageInput) {
                  sendMessage(messageInput);
                  setMessageInput("");
                }
              }}
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-500"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
