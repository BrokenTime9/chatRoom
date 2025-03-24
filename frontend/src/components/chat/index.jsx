import { useState } from "react";
import useRoomStore from "@/store/room/roomStore";

const Chat = () => {
  const { messages, activeRoom, sendMessage } = useRoomStore();
  const [messageInput, setMessageInput] = useState("");

  return (
    <div className="w-full mx-auto p-6 bg-primarybg text-primaryt rounded-lg shadow-lg flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Room: {activeRoom}</h1>
      </div>

      <div className="h-64 overflow-y-auto bg-gray-700 p-2 rounded mt-2 flex-grow">
        {messages[activeRoom]?.map((msg, index) => (
          <div key={index} className="mt-1">
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message..."
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
        />
        <button
          onClick={() => {
            if (messageInput) {
              sendMessage(messageInput);
              setMessageInput("");
            }
          }}
          className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-500 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
