import { create } from "zustand";
import { io } from "socket.io-client";
import axios from "axios";

const link = ["https://chatroom-2clf.onrender.com", "http://localhost:5000"];

const socket = io.connect(link[0]);

let initialized = false;

const useRoomStore = create((set, get) => ({
  rooms: [],
  messages: {},
  activeRoom: null,
  activeUsers: 0,

  fetchInitialData: async () => {
    try {
      const response = await axios.get(`${link[0]}/data`);
      const { rooms, users } = response.data;

      set({ rooms, activeUsers: users });
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  },

  initSocketListeners: () => {
    if (initialized) return;
    initialized = true;

    socket.on("updateRooms", (rooms) => set({ rooms }));

    socket.on("allRooms", (rooms) => {
      set(rooms);
    });

    socket.on("totalUsers", (users) => {
      console.log(users);
      set({ activeUsers: users });
    });

    socket.on("error", (error) => console.log(error));

    socket.on("newMessage", ({ room, message }) => {
      const currentRoom = get().activeRoom;
      if (currentRoom === room) {
        set((state) => ({
          messages: {
            ...state.messages,
            [room]: [...(state.messages[room] || []), message],
          },
        }));
      }
    });
  },

  createRoom: (roomName) => {
    socket.emit("createRoom", roomName);
  },

  joinRoom: (room) => {
    socket.emit("joinRoom", room);
    set({ activeRoom: room });
  },

  sendMessage: (message) => {
    const room = get().activeRoom;
    if (room) {
      socket.emit("sendMessage", { room, message });
    }
  },
}));

export default useRoomStore;
