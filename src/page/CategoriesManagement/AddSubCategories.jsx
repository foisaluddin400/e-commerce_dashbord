import { Form, Input, Modal, Select, Upload } from "antd";
import React, { useState } from "react";
import { useAddsubCategoryMutation, useGetCategoryQuery } from "../redux/api/categoryApi";
// import { useAddSubCategoryMutation, useGetCategroyQuery } from "../redux/api/productManageApi";
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
const AddSubCategories = ({ openAddModal, setOpenAddModal }) => {
  
const [addCategory] = useAddsubCategoryMutation()
  // const [addSubCategory] = useAddSubCategoryMutation();
  // const { data: category } = useGetCategroyQuery();
  // const formCategory = category?.data?.result || [];

  // Dummy categories
  //not category data up 20
  const limit = 3
  const page = 1
  const{data:category} = useGetCategoryQuery({limit, page:page})
  console.log(category)
  const formCategory = category?.data;

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
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
      const formData = new FormData();

      fileList.forEach((file) => {
        formData.append("image", file.originFileObj);
      });
      formData.append("name", values.name);
       formData.append("parentCategoryId", values.category);

      const res = await addCategory(formData);
      console.log(res);
      message.success(res.data.message);
      setLoading(false);
      setOpenAddModal(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      message.error(message?.data?.error);
      setOpenAddModal(false);
    } finally {
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
          <Select  style={{ height:"40px" }} placeholder="Select">
              {formCategory?.map((cat) => (
                <Select.Option key={cat?._id} value={cat?._id}>
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
              style={{ height:"40px" }}
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
