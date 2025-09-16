import React, { useState } from "react";
import Client from "./Client";
import Vendor from "./Vendor";


import { Navigate } from "../../Navigate";
const SupportTab = () => {
  const [activeTab, setActiveTab] = useState("client");



  return (
    <div className="bg-white p-3 h-[87vh] overflow-auto">
      <Navigate title={"Support"}></Navigate>
      {/* Tabs */}
      <div className="flex justify-between">
        <div className="flex space-x-6 border p-1 rounded mb-4">
       
          <button
            className={`${
              activeTab === "client"
                ? " font-semibold bg-red-500 text-white px-5 py-1 rounded"
                : "text-gray-600 px-5 py-1"
            }`}
            onClick={() => setActiveTab("client")}
          >
            Client
          </button>
          <button
            className={`${
              activeTab === "vendor"
                ? "font-semibold bg-red-500 text-white px-5 py-1 rounded"
                : "text-gray-600 px-5 py-1"
            }`}
            onClick={() => setActiveTab("vendor")}
          >
            Admin
          </button>
        </div>
       
      </div>

      {/* Tab Content */}
      <div>


        {activeTab === "client" && (
          <div className="text-gray-700 text-lg">
            <Client></Client>
          </div>
        )}

        {activeTab === "vendor" && (
          <div className="text-gray-700 text-lg">
            <Vendor></Vendor>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportTab;
