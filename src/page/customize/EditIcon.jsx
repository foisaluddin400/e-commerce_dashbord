import { Form, Input, message, Modal, Spin, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useUpdateIconMutation } from "../redux/api/couponApi";
import { imageUrl } from "../redux/api/baseApi";

const EditIcon = ({ editModal, setEditModal, selectedCategory }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateicon] = useUpdateIconMutation();

  useEffect(() => {
    if (editModal && selectedCategory) {
      form.setFieldsValue({
        name: selectedCategory.iconName,
      });

      const existingImages =
        selectedCategory.iconUrls?.map((url, index) => ({
          uid: `-${index + 1}`,
          name: `image-${index + 1}${url.slice(url.lastIndexOf("."))}`,
          status: "done",
          url: `${imageUrl}${url}`,
          originUrl: url,
        })) || [];

      setFileList(existingImages);
    } else {
      setFileList([]);
      form.resetFields();
    }
  }, [editModal, selectedCategory, form]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url || file.thumbUrl;
    if (!src && file.originFileObj) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open("");
    if (imgWindow) {
      imgWindow.document.write(`
        <html>
          <head><title>${file.name}</title></head>
          <body style="margin:0;display:flex;justify-content:center;align-items:center;height:100vh;background:#f0f0f0;">
            <img src="${src}" style="max-width:90%;max-height:90%;object-fit:contain;" />
          </body>
        </html>
      `);
    }
  };

  const handleCancel = () => {
    setEditModal(false);
  };

  const handleSubmit = async (values) => {
    if (fileList.length === 0) {
      message.error("At least one image is required!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();

      const existingImagePaths = fileList
        .filter((file) => !file.originFileObj && file.url)
        .map((file) => file.originUrl || file.url.replace(imageUrl, ""));

      existingImagePaths.forEach((path) => {
        formData.append("existingIcons", path);
      });

      const newFiles = fileList.filter((file) => file.originFileObj);
      newFiles.forEach((file) => {
        formData.append("icon", file.originFileObj);
      });

      formData.append("iconName", values.name);

      const res = await updateicon({ id: selectedCategory._id, formData }).unwrap();

      message.success(res?.message || "Icon updated successfully!");
      setEditModal(false);
    } catch (error) {
      console.error("Update error:", error);
      message.error(error?.data?.message || "Failed to update icon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={<div className="text-center font-bold text-xl">Edit Icon</div>}
      open={editModal}
      onCancel={handleCancel}
      footer={null}
      width={700}
      centered
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-4"
      >
        <Form.Item
          label="Icon Name"
          name="name"
          rules={[{ required: true, message: "Please enter icon name" }]}
        >
          <Input placeholder="Enter icon name" style={{ height: "40px" }} />
        </Form.Item>

        <Form.Item label="Icon Images">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            multiple={true}
            beforeUpload={() => false}
            accept="image/*"
          >
            {fileList.length >= 500 ? null : (
              <div className="flex flex-col items-center justify-center p-4">
                <svg
                  className="w-8 h-8 text-gray-400 mb-2"
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
                <span className="text-sm">+ Add More Images</span>
              </div>
            )}
          </Upload>
          <div className="text-xs text-gray-500 mt-2">
            You can add or remove images. Existing images can be deleted.
          </div>
        </Form.Item>

        <Form.Item className="mb-0">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-medium flex justify-center items-center gap-2 transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#E63946] hover:bg-[#c72e3a]"
            }`}
          >
            {loading ? (
              <>
                <Spin size="small" />
                <span>Updating...</span>
              </>
            ) : (
              "Update Icon"
            )}
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditIcon;