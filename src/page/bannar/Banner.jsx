import React, { useState } from "react";
import {
  Table,
  Modal,
  Form,
  Input,
  Upload,
  Spin,
  Pagination,
  message,
} from "antd";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { UploadOutlined } from "@ant-design/icons";
import {
  useAddBannerMutation,
  useDeleteBannerMutation,
  useGetbannerQuery,
  useUpdateBannerMutation,
} from "../redux/api/metaApi";
import { Navigate } from "../../Navigate";
import { imageUrl } from "../redux/api/baseApi";



const Banner = () => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  const { data: bannerData, isLoading } = useGetbannerQuery({
    page: currentPage,
    limit: pageSize,
  });

  const [addBanner] = useAddBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();
  const [deleteBanner] = useDeleteBannerMutation();

  // ---------------- handlers ----------------

  const handleOpenAdd = () => {
    form.resetFields();
    setFileList([]);
    setEditData(null);
    setOpenModal(true);
  };

  const handleEdit = (record) => {
    setEditData(record);
    form.setFieldsValue({
      title: record.title,
      description: record.description,
    });
    setFileList([
      {
        uid: "-1",
        name: "image",
        status: "done",
        url: imageUrl + record.image,
      },
    ]);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBanner(id).unwrap();
      message.success("Banner deleted successfully");
    } catch {
      message.error("Failed to delete banner");
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);

      if (fileList[0]?.originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      }

      if (editData) {
        await updateBanner({ id: editData._id, data: formData }).unwrap();
        message.success("Banner updated successfully");
      } else {
        await addBanner(formData).unwrap();
        message.success("Banner added successfully");
      }

      setOpenModal(false);
      setEditData(null);
      form.resetFields();
      setFileList([]);
    } catch {
      message.error("Must be jpg, png, jpeg format");
    }
  };

  // ---------------- table columns ----------------

  const columns = [
    {
      title: "SL",
      render: (_, __, index) =>
        (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Image",
      dataIndex: "image",
      align: "center",
      render: (img) => (
        <img
          src={imageUrl + img}
          className="w-16 h-12 object-cover rounded mx-auto"
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      align: "center",
      ellipsis: true,
    },
    {
      title: "Actions",
      align: "center",
      render: (_, record) => (
        <div className="flex gap-3 justify-center">
          <div
            onClick={() => handleEdit(record)}
            className="w-9 h-9 bg-blue-500 text-white flex items-center justify-center rounded cursor-pointer"
          >
            <MdOutlineModeEdit />
          </div>
          <div
            onClick={() => handleDelete(record._id)}
            className="w-9 h-9 bg-red-500 text-white flex items-center justify-center rounded cursor-pointer"
          >
            <RiDeleteBin6Line />
          </div>
        </div>
      ),
    },
  ];

  // ---------------- UI ----------------

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between mb-4">
        <Navigate title="Banner" />
        <button
          onClick={handleOpenAdd}
          className="bg-[#E63946] text-white px-5 py-2 rounded"
        >
          Add Banner
        </button>
      </div>

      <Table
        dataSource={bannerData?.data || []}
        columns={columns}
        rowKey="_id"
        loading={isLoading}
        pagination={false}
      />

      <div className="mt-5 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={bannerData?.meta?.total || 0}
          onChange={setCurrentPage}
        />
      </div>

      {/* ADD / EDIT MODAL */}
      <Modal
        centered
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
        width={600}
      >
        <div className="font-bold text-center mb-5">
          {editData ? "Update Banner" : "Add Banner"}
        </div>

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Image">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={({ fileList }) =>
                setFileList(fileList.slice(-1))
              }
              beforeUpload={() => false}
            >
              {fileList.length < 1 && <UploadOutlined />}
            </Upload>
          </Form.Item>

          <button
            type="submit"
            className="w-full bg-[#E63946] text-white py-3 rounded"
          >
            {editData ? "Update" : "Submit"}
          </button>
        </Form>
      </Modal>
    </div>
  );
};

export default Banner;
