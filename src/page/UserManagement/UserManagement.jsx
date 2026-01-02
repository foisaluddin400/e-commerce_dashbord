import React, { useState, useMemo } from "react";
import { Input, Modal, Pagination, Popconfirm, Select, Table, message } from "antd";
import { MdBlockFlipped } from "react-icons/md";
import { SearchOutlined } from "@ant-design/icons";
import { LuEye } from "react-icons/lu";
import { Navigate } from "../../Navigate";
import { useBlockUserMutation, useGetUserQuery } from "../redux/api/userApi";
import { imageUrl } from "../redux/api/baseApi";

const UserManagement = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 10;

  /* ================= API CALL ================= */
  const { data: userData, isLoading } = useGetUserQuery({
    search: searchTerm,
    page: currentPage,
    limit: pageSize,
    ...(statusFilter && { status: statusFilter }),
  });

  const [blockUser] = useBlockUserMutation();

  /* ================= FORMAT TABLE DATA ================= */
  const tableData = useMemo(() => {
    return (
      userData?.data?.users?.map((user, index) => ({
        key: user._id,
        no: (currentPage - 1) * pageSize + index + 1,
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone || "N/A",
        status: user.status,
        image: user.imageUrl
          ? `${imageUrl}${user.imageUrl}`
          : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
        createdAt: new Date(user.createdAt).toLocaleDateString(),
      })) || []
    );
  }, [userData, currentPage]);

  /* ================= BLOCK / UNBLOCK ================= */
  const handleBlock = async (id) => {
    try {
      const res = await blockUser(id).unwrap();
      message.success(res?.message || "Status updated");
    } catch (err) {
      message.error(err?.data?.message || "Something went wrong");
    }
  };

  /* ================= MODAL ================= */
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openModal = (record) => {
    setSelectedUser(record);
    setOpen(true);
  };

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    { title: "No", dataIndex: "no", width: 70 },

    {
      title: "User",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.image}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span>{record.name}</span>
        </div>
      ),
    },

    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },

    {
      title: "Status",
      render: (_, record) => (
        <span
          className={`px-3 py-1 rounded text-xs font-semibold ${
            record.status === "BLOCKED"
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {record.status}
        </span>
      ),
    },

    {
      title: "Action",
      render: (_, record) => (
        <div className="flex gap-3">
          <button onClick={() => openModal(record)}>
            <LuEye className="text-xl" />
          </button>
          <Popconfirm
            title={`Are you sure to ${record.status === "BLOCKED" ? "unblock" : "block"} this User?`}
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleBlock(record.id)}
          >
            <button
              className={`w-8 h-8 flex justify-center items-center rounded text-white ${
                record.status === "BLOCKED" ? "bg-red-600" : "bg-green-600"
              }`}
            >
              <MdBlockFlipped />
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-4 h-[87vh] overflow-auto">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between mb-4">
        <Navigate title="User Management" />

        <div className="flex gap-4">
          <Select
            value={statusFilter}
            onChange={(v) => {
              setStatusFilter(v);
              setCurrentPage(1);
            }}
            style={{ width: "200px", height: "40px" }}
            options={[
              { value: "", label: "All Users" },
              { value: "UNBLOCKED", label: "Unblocked" },
              { value: "BLOCKED", label: "Blocked" },
            ]}
          />

          <Input
            placeholder="Search by name or email"
            prefix={<SearchOutlined />}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          style={{ maxWidth: "500px", height: "40px" }}
          />
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <Table
        loading={isLoading}
        dataSource={tableData}
        columns={columns}
        pagination={false}
        rowKey="key"
      />

      {/* ================= PAGINATION ================= */}
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={userData?.data?.pagination?.totalUsers || 0}
          onChange={setCurrentPage}
          showSizeChanger={false}
        />
      </div>

      {/* ================= MODAL ================= */}
      <Modal open={open} footer={null} onCancel={() => setOpen(false)} centered>
        {selectedUser && (
          <div className="text-center">
            <img
              src={selectedUser.image}
              className="w-24 h-24 rounded-full mx-auto mb-3"
            />
            <h2 className="text-xl font-bold">{selectedUser.name}</h2>
            <p className="text-gray-500">{selectedUser.email}</p>
            <p className="text-gray-500">{selectedUser.phone}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserManagement;
