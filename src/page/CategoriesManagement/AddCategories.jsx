import { Form, Input, Modal, Spin } from "antd";
import React, { useState } from "react";
// import { useAddCategoryMutation } from "../redux/api/productManageApi";

const AddCategories = ({ openAddModal, setOpenAddModal }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  // const [addcategory] = useAddCategoryMutation();
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const files = Array.from(e.target.files).map((f) => ({
      name: f.name,
      originFileObj: f,
    }));
    setFileList(files);
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setOpenAddModal(false);
  };

  const handleSubmit = async (values) => {
    console.log("Submitted values:", values);
    setLoading(true);

    try {
      // Dummy submit logic
      const data = {
        name: values.name,
        category_image: fileList.map((file) => file.name),
      };
      console.log("Dummy data to submit:", data);

      setTimeout(() => {
        alert("Category added successfully (dummy)!");
        setOpenAddModal(false);
        form.resetFields();
        setFileList([]);
        setLoading(false);
      }, 1000);

      /*
      // Actual API call (commented)
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append("category_image", file.originFileObj);
      });
      formData.append("data", JSON.stringify({ name: values.name }));
      const res = await addcategory(formData);
      message.success(res.data.message);
      setOpenAddModal(false);
      form.resetFields();
      setFileList([]);
      setLoading(false);
      */
    } catch (error) {
      console.error(error);
      alert("Something went wrong (dummy)!");
      setLoading(false);
      setOpenAddModal(false);
    }
  };

  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <div className="mb-20 mt-4">
        <div>
          <div className="font-bold text-center mb-11">+ Add Category</div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="px-2"
          >
            <Form.Item
              label="Category Name"
              name="name"
              rules={[{ required: true, message: "Please input name!" }]}
            >
              <Input
                placeholder="Enter title"
                style={{ borderRadius: "0px", padding: "6px 8px" }}
              />
            </Form.Item>

            <Form.Item label="Photos">
              <input type="file" multiple onChange={onChange} />
            </Form.Item>

            {/* Save Button */}
            <Form.Item>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 mt-2 bg-[#E63946] text-white rounded-md"
              >
                {loading ? <Spin size="small" /> : "Add"}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default AddCategories;
