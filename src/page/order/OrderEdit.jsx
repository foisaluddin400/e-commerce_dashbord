import { Form, message, Modal, Radio } from "antd";
import React, { useEffect } from "react";
// 🔹 API integration comment করে রাখা হলো
// import { useUpdateOrderMutation } from "../redux/api/orderApi";

const OrderEdit = ({ editModal, setEditModal, selectedRecord }) => {
  // const [updateOrder] = useUpdateOrderMutation();
  const [form] = Form.useForm();

  // Modal Cancel
  const handleCancel = () => {
    form.resetFields();
    setEditModal(false);
  };

  // Set initial values when modal opens
  useEffect(() => {
    if (selectedRecord) {
      form.setFieldsValue({
        orderStatus: selectedRecord?.orderStatus,
        paymentStatus: selectedRecord?.paymentStatus,
      });
    }
  }, [selectedRecord, form]);

  // Handle Form Submit (Dummy Update)
  const handleSubmit = async (values) => {
    const data = {
      order_id: selectedRecord?.key,
      order_status: values.orderStatus,
      payment_status: values.paymentStatus,
    };

    try {
      console.log("Dummy Update Data:", data);
      // 🔹 Dummy success response
      message.success("Order updated successfully (Dummy)");
      form.resetFields();
      setEditModal(false);
    } catch (error) {
      console.log(error);
      message.error("Something went wrong (Dummy)");
    }
  };

  return (
    <Modal
      centered
      open={editModal}
      onCancel={handleCancel}
      footer={null}
      width={400}
    >
      <div className="mb-6 mt-4">
        <h2 className="text-center font-bold text-lg mb-6">Edit Order</h2>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          {/* Order Status */}
          <Form.Item
            label="Order Status"
            name="orderStatus"
            rules={[{ required: true, message: "Please select order status" }]}
          >
            <Radio.Group>
              <Radio value="Pending">Pending</Radio>
              <Radio value="In Progress">In Progress</Radio>
              <Radio value="Shipped">Shipped</Radio>
              <Radio value="Completed">Completed</Radio>
              <Radio value="Canceled">Canceled</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Payment Status */}
          <Form.Item
            label="Payment Status"
            name="paymentStatus"
            rules={[
              { required: true, message: "Please select payment status" },
            ]}
          >
            <Radio.Group>
              <Radio value="Pending">Pending</Radio>
              <Radio value="Paid">Paid</Radio>
              <Radio value="Canceled">Canceled</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              className="px-4 py-2 w-full border text-black rounded-md"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 w-full bg-[#E63946] text-white rounded-md"
            >
              Update
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default OrderEdit;
