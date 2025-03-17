const SideBar = () => {
  return (
    <div className="h-full flex flex-col w-[20%] bg-secondarybg shadow">
      <div className="flex justify-start w-full p-4">
        <h1 className="text-primaryt text-3xl font-semibold">Online</h1>
      </div>
      <div className="flex-grow"></div>
    </div>
  );
};

export default SideBar;
