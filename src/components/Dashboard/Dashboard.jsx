import { RiUserForbidLine } from "react-icons/ri";

import BookingGrowth from "./BookingGrowth";
import ShopRegistration from "./ShopRegister";
import UserGrowthChart from "./UserGrowthChart";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { VscNote } from "react-icons/vsc";
import { PiMoneyLight } from "react-icons/pi";
const Dashboard = () => {
  return (
    <div className=" ">
      <div className="grid grid-cols-4 gap-4">
        <div className="flex gap-4 items-center bg-white p-6 rounded shadow">
          <div className="bg-yellow-100 w-[55px] rounded-full h-[55px] flex justify-center items-center text-3xl">
            <HiOutlineUserGroup className="text-yellow-500" />
          </div>
          <div>
            <h1 className="font-semibold text-2xl">1,100</h1>
            <h1 className="text-zinc-500"> Total User</h1>
          </div>
        </div>
        <div className="flex gap-4 items-center bg-white p-6 rounded shadow">
          <div className="bg-sky-100 w-[55px] rounded-full h-[55px] flex justify-center items-center text-3xl">
            <RiUserForbidLine className="text-sky-600" />
          </div>
          <div>
            <h1 className="font-semibold text-2xl">1,100</h1>
            <h1 className="text-zinc-500"> User Block</h1>
          </div>
        </div>
        <div className="flex gap-4 items-center bg-white p-6 rounded shadow">
          <div className="bg-green-100 w-[55px] rounded-full h-[55px] flex justify-center items-center text-3xl">
            <VscNote className="text-green-500" />
          </div>
          <div>
            <h1 className="font-semibold text-2xl">1,100</h1>
            <h1 className="text-zinc-500"> Total Booking</h1>
          </div>
        </div>
        <div className="flex gap-4 items-center bg-white p-6 rounded shadow">
          <div className="bg-purple-100 w-[55px] rounded-full h-[55px] flex justify-center items-center text-3xl">
            <PiMoneyLight className="text-purple-500" />
          </div>
          <div>
            <h1 className="font-semibold text-2xl">1,100</h1>
            <h1 className="text-zinc-500"> Total Earning</h1>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4 ">
        <div className="w-full h-full bg-white p-4 rounded shadow">
          <UserGrowthChart />
        </div>
        <div className=" bg-white p-4 rounded shadow ">
          {/* <ActivityStatisticsChart /> */}
          <BookingGrowth></BookingGrowth>
        </div>
      </div>

      <div className="w-full bg-white p-4 rounded shadow mt-4">
        <ShopRegistration></ShopRegistration>
      </div>
    </div>
  );
};

export default Dashboard;
