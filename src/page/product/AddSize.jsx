import { Form, Input, Modal, message } from "antd";
import React from "react";
import { useAddSeizeMutation } from "../redux/api/categoryApi";

const AddSize = ({ openAddModal, setOpenAddModal }) => {
  const [addSize] = useAddSeizeMutation();
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    setOpenAddModal(false);
  };

  const handleSubmit = async (values) => {
    try {
      // Send only `name` to API
      await addSize({ name: values.sizeName }).unwrap();

      message.success("Size added successfully!");
      handleCancel();
    } catch (error) {
      console.error(error);
      message.error("Failed to add size");
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
              type="submit"
              className="px-4 py-3 w-full bg-[#D17C51] text-white rounded-md"
            >
              Add
            </button>
            <button
              type="button"
              className="px-4 py-3 w-full bg-[#D9000A] text-white rounded-md"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddSize;
