import React, { useState } from "react";
import { Table, Button, Space, Input, message } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { Navigate } from "../../Navigate";
import AddSize from "./AddSize";
import { useDeleteSizeMutation, useGetSizeQuery } from "../redux/api/categoryApi";

const SizePage = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const { data: sizeData } = useGetSizeQuery();
const [deleteSize] = useDeleteSizeMutation()

  const handleDelete =async (id) => {
     try {
      const res = await deleteSize(id).unwrap();
      message.success(res?.message);
    } catch (err) {
      message.error(err?.data?.message);
    }
  };

  const columns = [
    {
      title: "S.N",
      key: "sn",
      render: (_, __, index) => index + 1,
      width: 70,
      align: "center",
      className: "font-medium",
    },
    {
      title: "Size",
      dataIndex: "name", 
      key: "name",
      align: "center",
      className: "font-medium",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            className="bg-[#E63946] text-white border-none"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          />
        </Space>
      ),
      align: "center",
      width: 100,
    },
  ];

  return (
    <div className="bg-white p-3 h-[87vh]">
      <div className="flex justify-between mb-4">
        <Navigate title={"Size"} />
        <div className="flex gap-5">
          <Input
            placeholder="Search by name..."
            prefix={<SearchOutlined />}
            style={{ maxWidth: "500px", height: "40px" }}
          />
          <div>
            <button
              onClick={() => setOpenAddModal(true)}
              className="bg-[#E63946] w-[150px] text-white py-2 rounded"
            >
              Add Size
            </button>
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={sizeData?.data || []} 
        rowKey="_id" 
        pagination={false}
        className="custom-table"
        scroll={{ x: "max-content" }}
        rowClassName={() => "border-b border-gray-200"}
      />

      <AddSize setOpenAddModal={setOpenAddModal} openAddModal={openAddModal} />
    </div>
  );
};

export default SizePage;
