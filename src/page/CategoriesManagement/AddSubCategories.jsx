import { Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";
// import { useAddSubCategoryMutation, useGetCategroyQuery } from "../redux/api/productManageApi";

const AddSubCategories = ({ open, setOpen, categoryName }) => {
  console.log(categoryName);

  // const [addSubCategory] = useAddSubCategoryMutation();
  // const { data: category } = useGetCategroyQuery();
  // const formCategory = category?.data?.result || [];

  // Dummy categories
  const formCategory = categoryName || [
    { _id: "1", name: "Fitness" },
    { _id: "2", name: "Yoga" },
    { _id: "3", name: "Cardio" },
  ];

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

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

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setOpen(false);
  };

  const handleSubmit = async (values) => {
    console.log("Submitted values:", values);
    setLoading(true);
    try {
      // Dummy submit logic
      const data = {
        name: values.name,
        category: values.category,
        sub_category_image: fileList.map((file) => file.name),
      };
      console.log("Dummy data to submit:", data);

      // Simulate API call delay
      setTimeout(() => {
        alert("Subcategory added successfully (dummy)!");
        setOpen(false);
        form.resetFields();
        setFileList([]);
        setLoading(false);
      }, 1000);

      /*
      // Actual API call (commented)
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append("sub_category_image", file.originFileObj);
      });
      formData.append("data", JSON.stringify({ name: values.name, category: values.category }));
      const res = await addSubCategory(formData);
      message.success(res.data.message);
      setOpen(false);
      form.resetFields();
      setFileList([]);
      setLoading(false);
      */
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert("Something went wrong (dummy)!");
      // message.error(error?.data?.error);
    }
  };

  return (
    <Modal
      centered
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <div className="mb-11 mt-4">
        <div className="font-bold text-center mb-11">+ Add Subcategory</div>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="px-2"
        >
          <Form.Item
            name="category"
            label="Category Name"
            rules={[{ required: true, message: "Please select a Category" }]}
          >
            <Select placeholder="Select">
              {formCategory.map((cat) => (
                <Select.Option key={cat._id} value={cat._id}>
                  {cat?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Sub Category Name"
            name="name"
            rules={[{ required: true, message: "Please input Subcategory Name" }]}
          >
            <Input
              placeholder="Enter Subcategory Name"
              style={{ borderRadius: "0px", padding: "6px 8px" }}
            />
          </Form.Item>

          <Form.Item label="Photos">
            <input
              type="file"
              multiple
              onChange={(e) =>
                setFileList(Array.from(e.target.files).map((f) => ({ name: f.name, originFileObj: f })))
              }
            />
          </Form.Item>

          <Form.Item>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 mt-2 bg-[#E63946] text-white rounded-md"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default AddSubCategories;
