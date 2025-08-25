import React, { useState } from "react";
import Client from "./Client";
import Vendor from "./Vendor";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const SupportTab = () => {
  const [activeTab, setActiveTab] = useState("all");

  const data = [
    { name: "Mr.Smith", email: "mrsmith14@gmail.com", type: "Client", time: "10:00 AM, Today" },
    { name: "Mr.Smith", email: "mrsmith14@gmail.com", type: "Vendor", time: "10:00 AM, Today" },
    { name: "Mr.Smith", email: "mrsmith14@gmail.com", type: "Client", time: "10:00 AM, Today" },
  ];

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex justify-between">
        <div className="flex space-x-6 border-b pb-2 mb-4">
        <button
          className={`${
            activeTab === "all" ? "text-red-500 font-semibold" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All
        </button>
        <button
          className={`${
            activeTab === "client" ? "text-red-500 font-semibold" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("client")}
        >
          Client
        </button>
        <button
          className={`${
            activeTab === "vendor" ? "text-red-500 font-semibold" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("vendor")}
        >
          Vendor
        </button>
      </div>
      <div>
           <Input
            // onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            prefix={<SearchOutlined />}
            className="w-64 px-4 py-2 rounded-lg bg-white"
          />
      </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "all" && (
          <div className="space-y-3">
            {data.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-red-100 px-4 py-3 rounded"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {item.name}{" "}
                    <span className="border border-red-400 text-red-500 text-xs px-2 py-0.5 rounded ml-2">
                      {item.type}
                    </span>
                  </h3>
                  <p className="text-sm text-red-500">{item.email}</p>
                  <p className="text-gray-500 text-sm">
                    A new support request has been submitted by a {item.type}
                  </p>
                </div>
                <div className="text-gray-700 font-medium">{item.time}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "client" && (
          <div className="text-gray-700 text-lg"><Client></Client></div>
        )}

        {activeTab === "vendor" && (
          <div className="text-gray-700 text-lg"><Vendor></Vendor></div>
        )}
      </div>
    </div>
  );
};

export default SupportTab;
