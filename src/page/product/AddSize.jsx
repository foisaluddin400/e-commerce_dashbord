import { Form, Input, Modal, Spin, message } from "antd";
import React, { useState } from "react";
import { useAddSeizeMutation } from "../redux/api/categoryApi";

const AddSize = ({ openAddModal, setOpenAddModal }) => {
  const [addSize] = useAddSeizeMutation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    form.resetFields();
    setOpenAddModal(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Send only `name` to API
      await addSize({ name: values.sizeName }).unwrap();

      message.success("Size added successfully!");
      handleCancel();
      setLoading(false);
    } catch (error) {
      console.error(error);
      message.error("Failed to add size");
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
      <div className="mb-6 mt-4">
        <h2 className="text-center font-bold text-lg mb-6">Add Size</h2>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Size Name"
            name="sizeName"
            rules={[{ required: true, message: "Please enter size name" }]}
          >
            <Input style={{ height: "45px" }} placeholder="Enter size name" />
          </Form.Item>

          <div className="flex gap-3 mt-4">
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
           
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddSize;
