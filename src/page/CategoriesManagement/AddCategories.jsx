import { Form, Input, message, Modal, Spin, Upload } from "antd";
import React, { useState } from "react";
import { useAddCategoryMutation } from "../redux/api/categoryApi";
// import { useAddCategoryMutation } from "../redux/api/productManageApi";
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
const AddCategories = ({ openAddModal, setOpenAddModal }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [addcategory] = useAddCategoryMutation();
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

      const res = await addcategory(formData);
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
      <div className="">
        <div>
          <div className="font-bold text-center mb-6">+ Add Category</div>

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

            {/* Save Button */}
            <Form.Item>
              <button
                    className={`w-full py-3 rounded text-white flex justify-center items-center gap-2 transition-all duration-300 ${
                      loading
                        ? "bg-[#fa8e97] cursor-not-allowed"
                        : "bg-[#E63946] hover:bg-[#941822]"
                    }`}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spin size="small" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default AddCategories;
