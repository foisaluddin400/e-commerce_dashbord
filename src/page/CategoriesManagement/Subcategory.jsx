import { Table, Input, Select, message, Pagination } from "antd";
import { useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Navigate } from "../../Navigate";
import { SearchOutlined } from "@ant-design/icons";
import AddSubCategories from "./AddSubCategories";
import EditSubCategories from "./EditSubCategories";
import {
  useDeletesubCategoriesMutation,
  useGetCategoryQuery,
  useGetsubCategoryQuery,
} from "../redux/api/categoryApi";
import { imageUrl } from "../redux/api/baseApi";

const Subcategory = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { data: subCategoryData, isLoading } = useGetsubCategoryQuery({
    search,
    page: currentPage,
    limit: pageSize,
  });
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteSubCategory] = useDeletesubCategoriesMutation();
  const { data: category } = useGetCategoryQuery();
  console.log(category);
  const formCategory = category?.data;
  if (isLoading) return <p>Loading...</p>;

  const handleEdit = (record) => {
    setSelectedCategory(record);
    setEditModal(true);
  };
  const handlePageChange = (page) => setCurrentPage(page);
  const handleDelete = async (id) => {
    try {
      const res = await deleteSubCategory(id).unwrap();
      message.success(res?.message);
    } catch (err) {
      message.error(err?.data?.message);
    }
  };

  const dataSource = subCategoryData?.data?.map((item, index) => ({
    key: item?._id,
    sl: (currentPage - 1) * pageSize + (index + 1),
    name: item?.name,
    categoryId: item?.parentCategoryId,
    categoryName: item?.parentCategoryId?.name,
    subImage: item?.imageUrl
      ? `${imageUrl}${item?.imageUrl}`
      : "https://via.placeholder.com/70",
    rawSub: item,
  }));

  const columns = [
    { title: "SL no.", dataIndex: "sl", key: "sl" },
    { title: "categoryName", dataIndex: "categoryName", key: "categoryName" },
    { title: "Subcategory", dataIndex: "name", key: "name" },
    {
      title: "Sub Image",
      dataIndex: "subImage",
      key: "subImage",
      render: (text) => <img src={text} alt="sub" className="w-[70px]" />,
    },
    {
      title: "Action",
      key: "action",
      align: "end",
      render: (_, record) => (
        <div className="flex gap-2 justify-end">
          <button
            className="w-[36px] h-[36px] bg-[#007BFF] text-white rounded flex justify-center items-center"
            onClick={() => handleEdit(record)}
          >
            <MdOutlineModeEdit />
          </button>
          <button
            className="w-[36px] h-[36px] bg-[#E63946] text-white rounded flex justify-center items-center"
            onClick={() => handleDelete(record.key)}
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-3 h-[87vh]">
      <div className="flex justify-between mb-4">
        <Navigate title={"Sub Category"} />
        <div className="flex gap-5">
          <Select
            style={{ height: "40px" }}
            placeholder="Select Category"
            // onChange={() => setShowStatus(true)}
          >
            {formCategory?.map((cat) => (
              <Select.Option key={cat?._id} value={cat?._id}>
                {cat?.name}
              </Select.Option>
            ))}
          </Select>

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
              Add Sub Category
            </button>
          </div>
        </div>
      </div>

      <Table columns={columns} dataSource={dataSource} pagination={false} />
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={subCategoryData?.meta?.total || 0}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
      <AddSubCategories
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
      />
      <EditSubCategories
        editModal={editModal}
        setEditModal={setEditModal}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default Subcategory;
