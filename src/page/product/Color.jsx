import React, { useState } from "react";
import { Table, Button, Space, message, Input, Pagination } from "antd";
import { EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { Navigate } from "../../Navigate";
import AddColor from "./AddColor";
import { useDeleteColorMutation, useGetColorQuery } from "../redux/api/categoryApi";
import EditColor from "./EditColor";

const Color = () => {
    const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { data: colorsData } = useGetColorQuery({    search,
    page: currentPage,
    limit: pageSize,});
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
   const [editModal, setEditModal] = useState(false);
   const[deleteData] = useDeleteColorMutation()
  // Convert API data to table format
  const colors =
    colorsData?.data?.map((item) => ({
      key: item._id,
      title: item.name,
      hex: item.hexValue,
    })) || [];
  const handleEdit = (record) => {
    setSelectedCategory(record);
    setEditModal(true);
  };
  const handleDelete = async(id) => {
  
        try {
      const res = await deleteData(id).unwrap();
      message.success(res?.message);
    } catch (err) {
      message.error(err?.data?.message);
    }
  };
  const handlePageChange = (page) => setCurrentPage(page);
  const columns = [
    {
      title: "S.N",
      key: "sn",
      render: (_, __, index) => index + 1,
      width: 70,
      className: "text-center font-medium",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      className: "font-medium",
    },
    {
      title: "Color",
      dataIndex: "hex",
      key: "color",
      render: (hex) => (
        <div
          className="w-8 h-8 rounded border"
          style={{ backgroundColor: hex }}
        ></div>
      ),
    },
    {
      title: "Hex Code",
      dataIndex: "hex",
      key: "hexCode",
      className: "font-mono",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            className="bg-green-700 text-white border-none"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            className="bg-[#E63946] text-white border-none"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white p-3 h-[87vh]">
      <div className="flex justify-between mb-4">
        <Navigate title={"Color"} />
        <div className="flex gap-5">
          <Input
           onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            prefix={<SearchOutlined />}
            style={{ maxWidth: "500px", height: "40px" }}
          />
          <div>
            <button
              onClick={() => setOpenAddModal(true)}
              className="bg-[#E63946] w-[150px] text-white py-2 rounded"
            >
              Add Color
            </button>
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={colors}
        pagination={false}
        className="custom-table"
        scroll={{ x: "max-content" }}
      />

      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={colorsData?.meta?.total || 0}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>

      <AddColor
        setOpenAddModal={setOpenAddModal}
        openAddModal={openAddModal}
        
      />
      <EditColor editModal={editModal} setEditModal={setEditModal} selectedCategory={selectedCategory}></EditColor>
    </div>
  );
};

export default Color;
