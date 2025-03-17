const Dashboard = () => {
  return (
    <div className="flex flex-col flex-grow h-full shadow rounded-full">
      <div className="bg-secondarybg flex-grow rounded-t-md"></div>
      <div className="bg-secondarybg p-4 flex justify-around shadow rounded-b-md">
        <input className="w-[90%] bg-primarybg p-4 rounded-md shadow focus:outline-none" />
        <button className="p-4 text-secondaryt font-semibold bg-primaryt rounded-md shadow">
          button
        </button>
      </div>
    </div>
  );
};
export default Dashboard;
