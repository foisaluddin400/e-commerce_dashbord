import React, { useState } from "react";
import { Navigate } from "../../Navigate";
import { Input, Modal, Form, Upload, Spin, message, Pagination } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import JoditEditor from "jodit-react";

import {
  useAddBlogsMutation,
  useDeleteBlogsMutation,
  useGetBlogsQuery,
  useUpdateBlogsMutation,
} from "../redux/api/blogApi";
import { imageUrl } from "../redux/api/baseApi";
import { EyeIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
    const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { data: blogData, refetch } = useGetBlogsQuery({    search,
    page: currentPage,
    limit: pageSize,});
  const [addBlogs] = useAddBlogsMutation();
  const [updateBlogs] = useUpdateBlogsMutation();
  const [deleteBlogs] = useDeleteBlogsMutation();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [fileList, setFileList] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteBlogs(id).unwrap();
      message.success(res.message);
      refetch();
    } catch (err) {
      message.error(err?.data?.message);
    }
  };

  const handleAdd = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();

      fileList.forEach((file) => {
        formData.append("image", file.originFileObj);
      });

      formData.append("title", values.title);
      formData.append("content", content);

      const res = await addBlogs(formData).unwrap();
      message.success(res.message);
      setOpenAddModal(false);
      form.resetFields();
      setFileList([]);
      setContent("");
      refetch();
    } catch (err) {
      message.error(err?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();

      
      if (fileList[0]?.originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      }

      formData.append("title", values.title);
      formData.append("content", content);

      const res = await updateBlogs({
        id: selectedBlog._id,
        data: formData,
      }).unwrap();

      message.success(res.message);
      setOpenEditModal(false);
      form.resetFields();
      setFileList([]);
      setContent("");
      setSelectedBlog(null);
      refetch();
    } catch (err) {
      message.error(err?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (page) => setCurrentPage(page);
  return (
    <div className="bg-white p-3 h-[87vh] overflow-auto">
      <div className="flex justify-between mb-4">
        <Navigate title="Blog" />
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
              Add Blog
            </button>
          </div>
        </div>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-4 gap-6">
        {blogData?.data?.map((blog) => (
          <div key={blog._id} className="border rounded p-2 flex flex-col">
            <img
              src={`${imageUrl}${blog.imageUrl}`}
              alt={blog.title}
              className="h-60 w-full object-cover rounded"
            />
            <h3 className="font-semibold mt-3 line-clamp-2">{blog.title}</h3>
            <div className="flex justify-end gap-2 mt-4">
              <div
                onClick={() => {
                  setSelectedBlog(blog);
                  form.setFieldsValue({ title: blog.title });
                  setContent(blog.content);
                  setFileList([
                    {
                      uid: "-1",
                      name: blog.imageUrl,
                      status: "done",
                      url: `${imageUrl}${blog.imageUrl}`,
                    },
                  ]);
                  setOpenEditModal(true);
                }}
                className="bg-green-600 cursor-pointer text-white py-1 px-3 rounded"
              >
                <button>
                  <EditOutlined />
                </button>
              </div>

              <div
                onClick={() => handleDelete(blog._id)}
                className="bg-red-600 cursor-pointer text-white py-1 px-3 rounded"
              >
                <button>
                  <DeleteOutlined />
                </button>
              </div>
             <Link to={`/dashboard/blog-details/${blog?._id}`}> <div
               
                className="bg-sky-500 cursor-pointer text-white py-1 px-3 rounded"
              >
                <button>
                  <EyeIcon></EyeIcon>
                </button>
              </div></Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={blogData?.meta?.total || 0}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>

      {/* Add Modal */}
      <Modal
        centered
        open={openAddModal}
        onCancel={() => setOpenAddModal(false)}
        footer={null}
        width={600}
      >
        <h2 className="text-center font-bold mb-6">+ Add Blog</h2>
        <Form form={form} layout="vertical" onFinish={handleAdd}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input placeholder="Title" style={{ height: "40px" }} />
          </Form.Item>
          <Form.Item label="Image">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              onPreview={onPreview}
            >
              {fileList.length < 1 && <PlusOutlined />}
            </Upload>
          </Form.Item>
          <Form.Item label="Content">
            <JoditEditor value={content} onBlur={setContent} />
          </Form.Item>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-2 bg-[#E63946] text-white rounded-md"
          >
            {loading ? <Spin size="small" /> : "Add"}
          </button>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        centered
        open={openEditModal}
        onCancel={() => setOpenEditModal(false)}
        footer={null}
        width={600}
      >
        <h2 className="text-center font-bold mb-6">Update Blog</h2>
        <Form form={form} layout="vertical" onFinish={handleEdit}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input placeholder="Title" style={{ height: "40px" }} />
          </Form.Item>
          <Form.Item label="Image">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              onPreview={onPreview}
            >
              {fileList.length < 1 && <PlusOutlined />}
            </Upload>
          </Form.Item>
          <Form.Item label="Content">
            <JoditEditor value={content} onBlur={setContent} />
          </Form.Item>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-2 bg-[#E63946] text-white rounded-md"
          >
            {loading ? <Spin size="small" /> : "Update"}
          </button>
        </Form>
      </Modal>
    </div>
  );
};

export default Blog;
