import { Table, Select, Button } from "antd";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import AddSubCategories from "./AddSubCategories";
import EditSubCategories from "./EditSubCategories";
// import { useDeleteSubCategoryMutation, useGetSubCategoryQuery } from "../redux/api/productManageApi";

const Subcategory = () => {
  // const [deletSubCategory] = useDeleteSubCategoryMutation();
  // const { data: subCategory, isLoading, isError } = useGetSubCategoryQuery();
  const [open, setOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const navigate = useNavigate();

  // Dummy data for categories
  const selectCategoryOptions = [
    { _id: "1", title: "Fitness" },
    { _id: "2", title: "Yoga" },
    { _id: "3", title: "Cardio" },
  ];

  // Dummy data for subcategories
  const dummySubCategories = [
    { _id: "101", name: "Cardio Basics", category: { _id: "3", name: "Cardio" }, image: "https://via.placeholder.com/70" },
    { _id: "102", name: "Advanced Yoga", category: { _id: "2", name: "Yoga" }, image: "https://via.placeholder.com/70" },
    { _id: "103", name: "Fitness 101", category: { _id: "1", name: "Fitness" }, image: "https://via.placeholder.com/70" },
  ];

  // Filter subcategories based on selected category
  const filteredSubCategories = dummySubCategories.filter((item) =>
    selectedCategoryId ? item.category._id === selectedCategoryId : true
  );

  // Table data
  const dataSource = filteredSubCategories.map((item, index) => ({
    key: item._id,
    sl: index + 1,
    image: item.category.image || "https://via.placeholder.com/70",
    name: item.name,
    category: item.category.name,
    subImage: item.image,
    rawCategory: item.category,
    rawSub: item,
  }));

  const handleSelectChange = (value) => {
    setSelectedCategoryId(value);
  };

  const handleEdit = (record) => {
    setSelectedCategory(record);
    setEditModal(true);
  };

  const handleDelete = (subId) => {
    alert(`Deleted subcategory with ID: ${subId}`);
  };

  const columns = [
    {
      title: "SL no.",
      dataIndex: "sl",
      key: "sl",
    },
    {
      title: "Subcategory",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Sub Image",
      dataIndex: "subImage",
      key: "subImage",
      render: (text) => <img src={text} alt="sub" className="w-[70px]" />,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2 justify-end">
          <button
            className="w-[36px] h-[36px] text-lg bg-[#007BFF] flex justify-center items-center text-white rounded"
            onClick={() => handleEdit(record)}
          >
            <MdOutlineModeEdit />
          </button>
          <button
            className="w-[36px] h-[36px] text-lg bg-[#E63946] flex justify-center items-center text-white rounded"
            onClick={() => handleDelete(record.rawSub._id)}
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mb-7 mt-4">
      <h1 className="flex gap-4 items-center">
        <button className="text-[#EF4849]" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <span className="text-lg font-semibold">Subcategory</span>
      </h1>

      <div className="flex justify-between mt-9">
        <Select
          className="min-w-[200px]"
          value={selectedCategoryId || undefined}
          onChange={handleSelectChange}
          placeholder="Select a category"
        >
          {selectCategoryOptions.map((cat) => (
            <Select.Option key={cat._id} value={cat._id}>
              {cat.title}
            </Select.Option>
          ))}
        </Select>
        <Button onClick={() => setOpen(true)} className="bg-[#E63946] text-white rounded-full">
          + Add
        </Button>
      </div>

      <div className="mt-6">
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      </div>

      <AddSubCategories open={open} setOpen={setOpen} categoryName={selectCategoryOptions} />
      <EditSubCategories
        editModal={editModal}
        setEditModal={setEditModal}
        selectedCategory={selectedCategory}
        category={selectCategoryOptions}
      />
    </div>
  );
};

export default Subcategory;
