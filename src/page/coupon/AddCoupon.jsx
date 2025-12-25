import { Form, Input, message, Modal, Spin, Upload, Select, DatePicker } from "antd";
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

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
  if (imgWindow) {
    imgWindow.document.write(image.outerHTML);
  }
};

const AddCoupon = ({ openAddModal, setOpenAddModal }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantityType, setQuantityType] = useState("unlimited"); // unlimited or limited
  const [discountType, setDiscountType] = useState("percentage"); // percentage or flat

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1)); // Only allow 1 image
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setQuantityType("unlimited");
    setDiscountType("percentage");
    setOpenAddModal(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = {
        ...values,
        image: fileList[0]?.originFileObj || null,
        quantityType,
        discountType,
        startDate: values.startDate?.format("YYYY-MM-DD"),
        endDate: values.endDate?.format("YYYY-MM-DD"),
      };

      console.log("Submitted Coupon Data:", formData);
      message.success("Coupon added successfully!");
      handleCancel();
    } catch (error) {
      message.error("Failed to add coupon.");
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
      width={700}
      title={<div className="text-center font-bold text-xl">+ Add New Coupon</div>}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="px-4"
      >
        {/* Image Upload */}
        <Form.Item
          label="Coupon Image"
          name="image"
          rules={[{ required: true, message: "Please upload a coupon image!" }]}
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            beforeUpload={() => false} // Prevent auto upload
            maxCount={1}
          >
            {fileList.length < 1 && (
              <div>
                <UploadOutlined />
                <div className="mt-2">Upload Image</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        {/* Coupon Reason Name */}
        <Form.Item
          label="Coupon Reason Name"
          name="reasonName"
          rules={[{ required: true, message: "Please enter coupon reason name!" }]}
        >
          <Input placeholder="e.g. Christmas Sale, Black Friday" style={{ height: "40px" }} />
        </Form.Item>

        {/* Coupon Code */}
        <Form.Item
          label="Coupon Code"
          name="couponCode"
          rules={[{ required: true, message: "Please enter coupon code!" }]}
        >
          <Input placeholder="e.g. SAVE20, FREESHIP" style={{ height: "40px" }} />
        </Form.Item>

        {/* Category */}
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select placeholder="Select category" style={{ height: "40px" }}>
            <Option value="electronics">Electronics</Option>
            <Option value="fashion">Fashion</Option>
            <Option value="home">Home & Living</Option>
            <Option value="beauty">Beauty</Option>
            <Option value="food">Food & Grocery</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        {/* Quantity Type */}
        <Form.Item label="Quantity Type" required>
          <Select
            value={quantityType}
            onChange={setQuantityType}
            style={{ height: "40px" }}
          >
            <Option value="unlimited">Unlimited</Option>
            <Option value="limited">Limited</Option>
          </Select>
        </Form.Item>

        {/* Conditional Quantity Input */}
        {quantityType === "limited" && (
          <Form.Item
            label="Quantity Limit"
            name="quantity"
            rules={[{ required: true, message: "Please enter quantity limit!" }]}
          >
            <Input type="number" placeholder="e.g. 100" style={{ height: "40px" }} min={1} />
          </Form.Item>
        )}

        {/* Start & End Date */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: "Please select start date!" }]}
          >
            <DatePicker style={{ width: "100%", height: "40px" }} format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: "Please select end date!" }]}
          >
            <DatePicker style={{ width: "100%", height: "40px" }} format="YYYY-MM-DD" />
          </Form.Item>
        </div>

        {/* Discount Type */}
        <Form.Item label="Discount Type" required>
          <Select
            value={discountType}
            onChange={setDiscountType}
            style={{ height: "40px" }}
          >
            <Option value="percentage">Percentage (%)</Option>
            <Option value="flat">Flat Amount ($)</Option>
          </Select>
        </Form.Item>

        {/* Discount Value */}
        <Form.Item
          label={`Discount Value (${discountType === "percentage" ? "%" : "$"})`}
          name="discountValue"
          rules={[{ required: true, message: "Please enter discount value!" }]}
        >
          <Input
            type="number"
            placeholder={discountType === "percentage" ? "e.g. 20" : "e.g. 10"}
            style={{ height: "40px" }}
            min={0}
            addonAfter={discountType === "percentage" ? "%" : "$"}
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded text-white flex justify-center items-center gap-2 transition-all duration-300 ${
              loading
                ? "bg-[#fa8e97] cursor-not-allowed"
                : "bg-[#E63946] hover:bg-[#c1121f]"
            }`}
          >
            {loading ? (
              <>
                <Spin size="small" />
                <span>Submitting...</span>
              </>
            ) : (
              "Add Coupon"
            )}
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCoupon;