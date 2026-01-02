import { Input, message, Pagination, Table, Modal } from "antd";
import { useState } from "react";
import { MdOutlineModeEdit, MdRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import { Navigate } from "../../Navigate";
import { SearchOutlined } from "@ant-design/icons";
import { useDeleteiconMutation, useGetIconQuery } from "../redux/api/couponApi";
import { imageUrl } from "../redux/api/baseApi";
import AddIcon from "./AddIcon";
import EditIcon from "./EditIcon";

const CustomizeIcon = () => {
  const [deleteIcon] = useDeleteiconMutation();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data: iconsResponse, isLoading } = useGetIconQuery({
    search,
    page: currentPage,
    limit: pageSize,
  });

  const icons = iconsResponse?.data || [];
  const total = iconsResponse?.meta?.total || 0;

  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // For View Modal
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewingIcon, setViewingIcon] = useState(null);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleDeleteCategory = async (id) => {
    try {
      const res = await deleteIcon(id).unwrap();
      message.success(res?.message || "Icon deleted successfully");
    } catch (err) {
      message.error(err?.data?.message || "Failed to delete");
    }
  };

  const handleEdit = (record) => {
    setSelectedCategory(record);
    setEditModal(true);
  };

  const handleView = (record) => {
    setViewingIcon(record);
    setViewModalOpen(true);
  };

  const columns = [
    {
      title: "SL No.",
      key: "sl",
      render: (_, __, index) => (currentPage - 1) * pageSize + (index + 1),

      
    },
    {
      title: "Icon Preview",
      key: "preview",
     
      render: (_, record) => {
        const firstImage = record.iconUrls?.[0];
        return firstImage ? (
          <img
            src={`${imageUrl}${firstImage}`}
            alt={record.iconName}
            className="w-16 h-16 object-contain rounded-lg border shadow-sm"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 text-xs">No Image</span>
          </div>
        );
      },
    },
    {
      title: "Icon Name",
      dataIndex: "iconName",
      key: "iconName",
      align: "center",
    },
    {
      title: "Total Images",
      key: "count",
      align: "center",
      render: (_, record) => (
        <span className="font-medium text-blue-600">
          {record.iconUrls?.length || 0}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "end",
      render: (_, record) => (
        <div className="flex gap-3 justify-end">
          {/* View Button */}
          <div
            onClick={() => handleView(record)}
            className="w-10 h-10 bg-green-500 flex justify-center items-center text-white rounded-lg cursor-pointer hover:bg-green-600 transition shadow"
            title="View all images"
          >
            <MdRemoveRedEye size={20} />
          </div>

          {/* Edit Button */}
          <div
            onClick={() => handleEdit(record)}
            className="w-10 h-10 bg-blue-500 flex justify-center items-center text-white rounded-lg cursor-pointer hover:bg-blue-600 transition shadow"
            title="Edit"
          >
            <MdOutlineModeEdit size={20} />
          </div>

          {/* Delete Button */}
          <div
            onClick={() => handleDeleteCategory(record._id)}
            className="w-10 h-10 bg-red-500 flex justify-center items-center text-white rounded-lg cursor-pointer hover:bg-red-600 transition shadow"
            title="Delete"
          >
            <RiDeleteBin6Line size={20} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-[87vh] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <Navigate title="Customize Icon" />
        <div className="flex gap-4 items-center">
          <Input
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            value={search}
            placeholder="Search by name..."
            prefix={<SearchOutlined />}
            style={{ width: "300px", height: "40px" }}
          />
          <button
            onClick={() => setOpenAddModal(true)}
            className="bg-[#E63946] text-white px-6 py-2 rounded-lg hover:bg-[#c72e3a] transition font-medium"
          >
            + Add Icons
          </button>
        </div>
      </div>

      <div className="">
        <Table
          dataSource={icons}
          columns={columns}
          rowKey="_id"
          pagination={false}
          loading={isLoading}
          scroll={{ x: "max-content" }}
        />
      </div>

      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>

      {/* Add Modal */}
      <AddIcon openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} />

      {/* Edit Modal */}
      <EditIcon
        editModal={editModal}
        setEditModal={setEditModal}
        selectedCategory={selectedCategory}
      />

      {/* View All Images Modal */}
      <Modal
        title={
          <div className="text-xl font-bold text-center">
            {viewingIcon?.iconName || "Icon Images"}
          </div>
        }
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={null}
        width={800}
        centered
      >
        <div className="mt-4">
          <p className="text-center text-gray-600 mb-6">
            Total Images: <strong>{viewingIcon?.iconUrls?.length || 0}</strong>
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {viewingIcon?.iconUrls?.map((url, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
              >
                <img
                  src={`${imageUrl}${url}`}
                  alt={`${viewingIcon.iconName} - ${index + 1}`}
                  className="w-full h-48 object-contain bg-gray-50 rounded-xl group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition flex items-end justify-center">
                  <p className="text-white opacity-0 group-hover:opacity-100 transition text-sm font-medium pb-3">
                    Image {index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {(!viewingIcon?.iconUrls || viewingIcon.iconUrls.length === 0) && (
            <p className="text-center text-gray-500 py-10">No images found</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default CustomizeIcon;