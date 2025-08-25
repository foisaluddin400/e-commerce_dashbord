import React, { useState } from "react";
import { Input, Modal, Pagination, Table, message } from "antd";
import { MdBlockFlipped } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { SearchOutlined } from "@ant-design/icons";
import { LuEye } from "react-icons/lu";

const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Dummy data
  const dummyUsers = Array.from({ length: 25 }, (_, index) => ({
    key: index + 1,
    no: index + 1,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    phone: `+8801${Math.floor(100000000 + Math.random() * 900000000)}`,
    block: index + 1,
    blockId: index % 2 === 0, // even users are blocked
    image: `https://avatar.iran.liara.run/public/${index + 1}`,
    createdAt: new Date().toLocaleDateString(),
  }));

  // Modal states
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const showModal2 = (record) => {
    setSelectedUser(record);
    setIsModalOpen2(true);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
    setSelectedUser(null);
  };

  // Dummy Block/Unblock
  const handleBlockUnblock = (id) => {
    message.success(`User with ID ${id} blocked/unblocked successfully`);
  };

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    {
      title: "Name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.image}
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <span>{record.name}</span>
        </div>
      ),
    },
    { title: "Phone Number", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <button className="text-2xl" onClick={() => showModal2(record)}>
            <LuEye />
          </button>
          <button
            onClick={() => handleBlockUnblock(record?.block)}
            className={`w-[30px] h-[30px] flex justify-center items-center text-xl rounded-md ${
              record.blockId ? "bg-green-600" : "bg-red-600"
            } text-white`}
          >
            <MdBlockFlipped />
          </button>
        </div>
      ),
    },
  ];

  // Pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Paginated data
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginatedUsers = dummyUsers.slice(start, end);

  return (
    <div className="">
      <div className="flex justify-between mb-7 mt-4">
        <h1 className="flex gap-4">
          <button
            className="text-[#EF4849] -mt-[20px]"
            onClick={() => window.history.back()}
          >
            <FaArrowLeft />
          </button>
          <span className="text-lg font-semibold">User Management</span>
        </h1>
        <Input
          placeholder="Search by name..."
          prefix={<SearchOutlined />}
          style={{ marginBottom: "16px", maxWidth: "300px" }}
        />
      </div>

      <Table
        dataSource={paginatedUsers}
        columns={columns}
        pagination={false}
        scroll={{ x: "max-content" }}
      />

      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={dummyUsers.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>

      {/* Modal */}
      <Modal
        open={isModalOpen2}
        centered
        onCancel={handleCancel2}
        footer={null}
      >
        {selectedUser && (
          <div className="w-full max-w-md p-5 mx-auto">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-blue-100 mb-3 overflow-hidden">
                <img
                  src={selectedUser.image}
                  alt="Profile avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold">{selectedUser.name}</h2>

              <div className="flex items-center text-gray-500 mt-1">
                <AiOutlinePhone size={16} className="text-gray-400" />
                <span className="ml-1 text-sm">{selectedUser.phone}</span>
              </div>

              <div className="flex items-center text-gray-500 mt-1">
                <GoLocation size={16} className="text-gray-400" />
                <span className="ml-1 text-sm">Location unavailable</span>
              </div>

              <div className="flex items-center text-gray-500 mt-1">
                <AiOutlineMail size={16} className="text-gray-400" />
                <span className="ml-1 text-sm">{selectedUser.email}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserManagement;
