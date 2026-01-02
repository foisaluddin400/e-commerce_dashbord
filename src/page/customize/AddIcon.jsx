import { Form, Input, message, Modal, Spin, Upload } from "antd";
import React, { useState } from "react";
import { useAddiconMutation } from "../redux/api/couponApi";

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
const AddIcon = ({ openAddModal, setOpenAddModal }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [addicon] = useAddiconMutation();
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
    if (fileList.length === 0) {
      message.error("Please upload at least one icon!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      fileList.forEach((file) => {
        formData.append("icon", file.originFileObj);
      });

      formData.append("iconName", values.name);

      const res = await addicon(formData);

      if (res.data?.success) {
        message.success(res.data.message || "Icons added successfully!");
        form.resetFields();
        setFileList([]);
        setOpenAddModal(false);
      } else {
        message.error(res.data?.message || "Failed to add icons");
      }
    } catch (error) {
      console.error("Upload error:", error);
      message.error("Upload failed. Please try again.");
    } finally {
      setLoading(false);
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
          <div className="font-bold text-center mb-6">+ Add icon</div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="px-2"
          >
            <Form.Item
              label="Icon Name"
              name="name"
              rules={[{ required: true, message: "Please input name!" }]}
            >
              <Input placeholder="Enter title" style={{ height: "40px" }} />
            </Form.Item>

            <Form.Item
              label="Icon Images"
              required
              rules={[
                { required: true, message: "Please upload at least one icon!" },
              ]}
            >
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                multiple={true}
                beforeUpload={() => false}
                showUploadList={{ showRemoveIcon: true }}
              >
                {fileList.length >= 15 ? null : (
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <div className="mt-2 text-sm text-gray-600">
                      + Upload Icons
                    </div>
                    <div className="text-xs text-gray-500">Up to 15 images</div>
                  </div>
                )}
              </Upload>
              <div className="text-xs text-gray-500 mt-2">
                You can upload multiple icons at once (JPG, PNG)
              </div>
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

export default AddIcon;
