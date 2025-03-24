import { create } from "zustand";
import { io } from "socket.io-client";
import axios from "axios";

const link = ["https://chatroom-2clf.onrender.com", "http://localhost:5000"];

const useRoomStore = create((set, get) => {
  let socket = null;
  let initialized = false;

  return {
    rooms: [],
    messages: {},
    activeRoom: null,
    activeUsers: 0,
    currentUser: null,

    fetchInitialData: async () => {
      try {
        const response = await axios.get(`${link[1]}/data`);
        const { rooms, users } = response.data;
        set({ rooms, activeUsers: users });
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    },

    initSocketListeners: () => {
      if (initialized) return;
      initialized = true;

      socket = io(link[1]);

      socket.on("updateRooms", (rooms) => set({ rooms }));

      socket.on("allRooms", (rooms) => {
        set({ rooms });
      });

      socket.on("totalUsers", (users) => {
        console.log(users);
        set({ activeUsers: users + 1 });
      });

      socket.on("currentUser", (user) => {
        set({ currentUser: user });
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
      if (socket) socket.emit("createRoom", roomName);
    },

    joinRoom: (room) => {
      if (socket) {
        socket.emit("joinRoom", room);
        set({ activeRoom: room });
      }
    },

    sendMessage: (message) => {
      const room = get().activeRoom;
      if (socket && room) {
        socket.emit("sendMessage", { room, message });
      }
    },
  };
});

export default useRoomStore;
