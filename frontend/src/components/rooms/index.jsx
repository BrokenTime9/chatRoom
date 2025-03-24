import useRoomStore from "@/store/room/roomStore";
import Link from "next/link";
import { useState } from "react";

const Rooms = () => {
  const { rooms, activeUsers, createRoom, joinRoom } = useRoomStore();
  const [roomInput, setRoomInput] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleCreateRoom = () => {
    if (roomInput) {
      createRoom(roomInput);
      setRoomInput("");
      setShowForm(false);
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-primarybg text-primaryt rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Chat Rooms</h1>

        <h1 className="text-md font-semibold bg-primarybg-dark px-4 py-2 rounded-lg">
          Users: {activeUsers}
        </h1>
      </div>

      {/* Room Creation Form */}
      {showForm && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <input
            type="text"
            value={roomInput}
            onChange={(e) => setRoomInput(e.target.value)}
            placeholder="Enter room name"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
          />
          <button
            onClick={handleCreateRoom}
            className="mt-3 bg-green-600 px-4 py-2 rounded-lg hover:bg-green-500 transition-all w-full"
          >
            Create Room
          </button>
        </div>
      )}

      {/* Room List */}
      <div className="mt-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold mb-3">Available Rooms:</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-secondarybg text-md px-4 py-2 rounded-lg hover:bg-primarybg-dark transition-all translate-y-[-6px]"
          >
            {showForm ? "Cancel" : "Add Room"}
          </button>
        </div>
        <div className="flex flex-col gap-4 px-3">
          {rooms.map((room) => (
            <div
              key={room}
              className="flex justify-between w-full px-4 py-3 rounded-lg bg-secondarybg hover:bg-primarybg-dark transition-all text-center"
            >
              <p>{room}</p>
              <button
                key={room}
                onClick={() => {
                  joinRoom(room);
                }}
              >
                <Link href={`/room/${room}`}>Join</Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
