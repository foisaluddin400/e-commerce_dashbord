import { Input, message, Table } from "antd";
import { useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import AddCategories from "./AddCategories";
import EditCategories from "./EditCategories";
import { Navigate } from "../../Navigate";
import { SearchOutlined } from "@ant-design/icons";
import { useDeleteCategoriesMutation, useGetCategoryQuery } from "../redux/api/categoryApi";
import { imageUrl } from "../redux/api/baseApi";

const Categories = () => {
  const [deleteCategory] = useDeleteCategoriesMutation();
  const { data: categorys, isLoading } = useGetCategoryQuery();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigate = useNavigate();
  const handleDeleteCategory = async (id) => {
    console.log(id)
    try {
      const res = await deleteCategory(id).unwrap();
      message.success(res?.message);
    } catch (err) {
      message.error(err?.data?.message);
    }
  };

  // ✏️ Edit Handler
  const handleEdit = (record) => {
    setSelectedCategory(record);
    setEditModal(true);
  };

  // 📝 Table Columns
  const columns = [
    {
      title: "SL No.",
      dataIndex: "sl",
      key: "sl",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (_, record) => (
        <img
          src={`${imageUrl}${record.imageUrl}`}
          alt={record.name}
          className="w-10 h-10 object-cover rounded mx-auto"
        />
      ),
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      align: "right",
      render: (_, record) => (
        <div className="flex gap-2 justify-end">
          <div
            onClick={() => handleEdit(record)}
            className="w-[36px] h-[36px] text-lg bg-[#007BFF] flex justify-center items-center text-white rounded cursor-pointer"
          >
            <MdOutlineModeEdit />
          </div>
          <div
            onClick={() => handleDeleteCategory(record._id)}
            className="w-[36px] h-[36px] text-lg bg-[#E63946] flex justify-center items-center text-white rounded cursor-pointer"
          >
            <RiDeleteBin6Line />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-3 h-[87vh]">
      <div className="flex justify-between mb-4">
        <Navigate title={"Category"} />
        <div className="flex gap-5">
          <Input
            placeholder="Search by name..."
            prefix={<SearchOutlined />}
            style={{ maxWidth: "500px", height: "40px" }}
          />
        <div>  <button
            onClick={() => setOpenAddModal(true)}
            className="bg-[#E63946] w-[150px] text-white py-2 rounded"
          >
            Add Category
          </button></div>
        </div>
      </div>

      <Table
        dataSource={categorys?.data || []}
        columns={columns}
        rowKey="_id"
        pagination={false}
        className="custom-table"
        scroll={{ x: "max-content" }}
        loading={isLoading}
      />

      <AddCategories
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
      />
      <EditCategories
        editModal={editModal}
        setEditModal={setEditModal}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default Categories;
