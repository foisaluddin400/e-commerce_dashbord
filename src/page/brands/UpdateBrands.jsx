import { Form, Input, message, Modal, Spin, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useUpdateBrandsMutation, useUpdateCategoryMutation } from "../redux/api/categoryApi";
import { imageUrl } from "../redux/api/baseApi";

const UpdateBrands = ({ editModal, setEditModal, selectedCategory }) => {
    console.log(selectedCategory?._id)
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateCategory] = useUpdateBrandsMutation();

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  useEffect(() => {
    if (editModal && selectedCategory) {
      form.setFieldsValue({
        name: selectedCategory?.brandName,
      });

      setFileList([
        {
          uid: "-1",
          name: "category-image.png",
          status: "done",
          url: `${imageUrl}${selectedCategory?.brandLogo
}`,
        },
      ]);
    }
  }, [editModal, selectedCategory, form]);

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
    setLoading(true);
    try {
      const formData = new FormData();
      if (fileList.length && fileList[0].originFileObj) {
        formData.append("brandLogo", fileList[0].originFileObj);
      }
      formData.append("brandName", values.name);

      const res = await updateCategory({ formData, id: selectedCategory?._id });
      message.success(res?.data?.message || "Updated successfully");
      setEditModal(false);
    } catch (error) {
      console.error(error);
      message.error(error?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      centered
      open={editModal}
      onCancel={handleCancel}
      footer={null}
      width={600}
      destroyOnClose // ✅ clears content when modal closes
    >
      <div className="mb-20 mt-4">
        <div className="font-bold text-center mb-11">Edit Brands</div>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="px-2"
        >
          <Form.Item
            label="Brand Name"
            name="name"
            rules={[{ required: true, message: "Please input title" }]}
          >
            <Input placeholder="Enter title" style={{ height: "40px" }} />
          </Form.Item>

          <Form.Item label="Photos">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              multiple={false}
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

export default UpdateBrands;
