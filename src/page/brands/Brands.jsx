import { message, Table } from "antd";
import { useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";


import { Navigate } from "../../Navigate";
import {
  useDeleteBrandsMutation,
  useGetBrandsNameQuery,
} from "../redux/api/categoryApi";
import { imageUrl } from "../redux/api/baseApi";
import AddBrands from "./AddBrands";
import UpdateBrands from "./UpdateBrands";

const Brands = () => {
  const [deleteBrands] = useDeleteBrandsMutation();
  const { data: brands, isLoading } = useGetBrandsNameQuery();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  // 🗑️ Delete Handler
  const handleDeleteBrand = async (id) => {
    try {
      const res = await deleteBrands(id).unwrap();
      message.success(res?.message);
    } catch (err) {
      message.error(err?.data?.message);
    }
  };

  // ✏️ Edit Handler
  const handleEdit = (record) => {
    setSelectedBrand(record);
    setEditModal(true);
  };

  // 📝 Table Columns
  const columns = [
    {
      title: "SL No.",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Logo",
      dataIndex: "brandLogo",
      align: "center",
      render: (logo) => (
        <img
          src={`${imageUrl}${logo}`}
          alt="brand logo"
          className="w-10 h-10 object-cover rounded mx-auto"
        />
      ),
    },
    {
      title: "Brand Name",
      dataIndex: "brandName",
      align: "center",
    },
    {
      title: "Actions",
      align: "center",
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <div
            onClick={() => handleEdit(record)}
            className="w-[36px] h-[36px] text-lg bg-[#007BFF] flex justify-center items-center text-white rounded cursor-pointer"
          >
            <MdOutlineModeEdit />
          </div>
          <div
            onClick={() => handleDeleteBrand(record._id)}
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
        <Navigate title={"Brands"} />
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-[#E63946] w-[150px] text-white py-2 rounded"
        >
          Add Brand
        </button>
      </div>

      <Table
        dataSource={brands?.data || []}
        columns={columns}
        rowKey="_id"
        pagination={false} // 🚫 No Pagination
        loading={isLoading}
      />

      <AddBrands
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
      />
      <UpdateBrands
        editModal={editModal}
        setEditModal={setEditModal}
        selectedCategory={selectedBrand}
      />
    </div>
  );
};

export default Brands;
