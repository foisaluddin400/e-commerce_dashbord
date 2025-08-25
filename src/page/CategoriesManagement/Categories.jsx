import { Table } from "antd";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import AddCategories from "./AddCategories";
import EditCategories from "./EditCategories";
// import {
//   useDeleteCategoryMutation,
//   useGetCategroyQuery,
// } from "../redux/api/productManageApi";

const Categories = () => {
  // const [deleteCategory] = useDeleteCategoryMutation();
  const [openAddModal, setOpenAddModal] = useState(false);
  // const { data: categorys, isLoading } = useGetCategroyQuery();
  // console.log(categorys);
  const [editModal, setEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // const handleDeleteFaq = async (id) => {
  //   try {
  //     const res = await deleteCategory(id).unwrap();
  //     message.success(res?.message);
  //   } catch (err) {
  //     message.error(err?.data?.message);
  //   }
  // };

  const navigate = useNavigate();

  const dummyData = [
    {
      _id: "1",
      name: "Fitness",
      category_image: "https://via.placeholder.com/64",
    },
    {
      _id: "2",
      name: "Yoga",
      category_image: "https://via.placeholder.com/64",
    },
    {
      _id: "3",
      name: "Cardio",
      category_image: "https://via.placeholder.com/64",
    },
  ];

  const handleEdit = (record) => {
    setSelectedCategory(record);
    setEditModal(true);
  };

  const handleDelete = (id) => {
    alert(`Deleted category with ID: ${id}`);
  };

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
          src={record.category_image}
          alt={record.name}
          className="w-16 h-16 object-cover rounded mx-auto"
        />
      ),
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      align: "name",
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
            onClick={() => handleDelete(record._id)}
            className="w-[36px] h-[36px] text-lg bg-[#E63946] flex justify-center items-center text-white rounded cursor-pointer"
          >
            <RiDeleteBin6Line />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="mb-7 mt-4">
      <h1 className="flex gap-4">
        <button className="text-[#EF4849]" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <span className="text-lg font-semibold">Category Management</span>
      </h1>

      <div className="flex justify-between mt-9">
        <button className="bg-[#E0CCCD] px-6 py-1 rounded">Category</button>
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-[#E63946] px-5 text-white rounded-full"
        >
          + Add
        </button>
      </div>

      <div className="mt-16">
        <Table
          dataSource={dummyData}
          columns={columns}
          rowKey="_id"
          pagination={false}
          // loading={isLoading} // API integration commented
        />
      </div>

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
