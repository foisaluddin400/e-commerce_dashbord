import { Form, Input, Modal, Spin, Upload } from "antd";
import React, { useEffect, useState } from "react";
// import { useUpdateCategoryMutation } from "../redux/api/productManageApi";

const EditCategories = ({ editModal, setEditModal, selectedCategory }) => {
  console.log("Selected Category:", selectedCategory);

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [updateCategory] = useUpdateCategoryMutation();

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  useEffect(() => {
    if (selectedCategory) {
      form.setFieldsValue({
        name: selectedCategory?.name,
      });

      setFileList([
        {
          uid: "-1",
          name: "category-image.png",
          status: "done",
          url: selectedCategory?.category_image || "https://via.placeholder.com/150",
        },
      ]);
    }
  }, [selectedCategory, form]);

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
    setEditModal(false);
  };

  const handleSubmit = async (values) => {
    console.log("Form values:", values);
    setLoading(true);

    try {
      // Dummy update logic
      const dummyData = {
        id: selectedCategory?.key || 1,
        name: values.name,
        category_image: fileList.map((file) => file.url || file.name),
      };
      console.log("Dummy update data:", dummyData);

      setTimeout(() => {
        alert("Category updated successfully (dummy)!");
        setEditModal(false);
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
      const res = await updateCategory({ formData, id: selectedCategory.key });
      message.success(res.data.message);
      setEditModal(false);
      setLoading(false);
      */
    } catch (error) {
      console.error(error);
      alert("Something went wrong (dummy)!");
      setLoading(false);
      setEditModal(false);
    }
  };

  return (
    <Modal
      centered
      open={editModal}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <div className="mb-20 mt-4">
        <div className="font-bold text-center mb-11">Edit Category</div>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="px-2"
        >
          <Form.Item
            label="Category Name"
            name="name"
            rules={[{ required: true, message: "Please input title" }]}
          >
            <Input
              placeholder="Enter title"
              style={{ borderRadius: "0px", padding: "6px 8px" }}
            />
          </Form.Item>

          <Form.Item label="Photos">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              multiple={true}
            >
              {fileList.length < 1 && "+ Upload"}
            </Upload>
          </Form.Item>

          {/* Save Button */}
          <Form.Item>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 mt-2 bg-[#E63946] text-white rounded-md"
            >
              {loading ? <Spin size="small" /> : "Update"}
            </button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default EditCategories;
