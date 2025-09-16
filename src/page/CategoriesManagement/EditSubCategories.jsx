import { Form, Input, message, Modal, Select, Spin, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useUpdatesubCategoryMutation } from "../redux/api/categoryApi";
// import { useUpdateSubCategoryMutation } from "../redux/api/productManageApi";

const EditSubCategories = ({
  editModal,
  setEditModal,
  selectedCategory,
}) => {
  console.log("Selected Subcategory:", selectedCategory?.categoryId?._id);

  // const [updateSub] = useUpdateSubCategoryMutation();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
const [editSub] = useUpdatesubCategoryMutation()
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
          name: "subcategory-image.png",
          status: "done",
          url: selectedCategory?.subImage || "https://via.placeholder.com/150",
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
      const formData = new FormData();

      fileList.forEach((file) => {
        formData.append("image", file.originFileObj);
      });
      formData.append("name", values.name);
       formData.append("parentCategoryId", selectedCategory?.categoryId?._id );

      const res = await editSub({ formData, id: selectedCategory?.key });
      console.log(res);
      message.success(res.data.message);
      setLoading(false);
      setEditModal(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      message.error(message?.data?.error);
      setEditModal(false);
    } finally {
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
      <div className="mb-11 mt-4">
        <div className="font-bold text-center mb-11">Edit Subcategory</div>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="px-2"
        >
          <Form.Item
            name="category"
            label="Select Your Preferred Volunteer Role"
          >
            <Select  style={{ height:"40px" }} disabled placeholder={selectedCategory?.categoryName}></Select>
          </Form.Item>

          <Form.Item
            label="Title"
            name="name"
            rules={[{ required: true, message: "Please input Title" }]}
          >
            <Input
              placeholder="Enter Title"
               style={{ height:"40px" }}
            />
          </Form.Item>

          {/* Upload */}
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

export default EditSubCategories;
