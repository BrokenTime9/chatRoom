"use client";
import Chat from "@/components/chat";
import useRoomStore from "@/store/room/roomStore";

const Room = () => {
  const { activeRoom, currentUser } = useRoomStore();

  console.log(currentUser);
  return (
    <div className="h-[100dvh] bg-primarybg-dark flex p-4">
      <Chat />
    </div>
  );
};

export default Room;
