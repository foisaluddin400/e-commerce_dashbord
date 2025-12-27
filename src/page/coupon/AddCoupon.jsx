import {
  Form,
  Input,
  message,
  Modal,
  Spin,
  Upload,
  Select,
  DatePicker,
} from "antd";
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useAddCouponMutation } from "../redux/api/couponApi";
import { useGetCategoryQuery } from "../redux/api/categoryApi";
import dayjs from "dayjs";

const { Option } = Select;

const AddCoupon = ({ openAddModal, setOpenAddModal }) => {
  const [form] = Form.useForm();
  const [addCoupon] = useAddCouponMutation();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantityType, setQuantityType] = useState("unlimited");
  const [discountType, setDiscountType] = useState("PERCENTAGE");

  const { data: categoryData } = useGetCategoryQuery({ limit: 10, page: 1 });

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setQuantityType("unlimited");
    setDiscountType("PERCENTAGE");
    setOpenAddModal(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("name", values.reasonName);
      formData.append("code", values.couponCode);
      formData.append("discountType", discountType);
      formData.append("discountValue", values.discountValue);
      formData.append("category", values.category);

      formData.append(
        "startDate",
        dayjs(values.startDate).format("YYYY-MM-DD")
      );
      formData.append(
        "endDate",
        dayjs(values.endDate).format("YYYY-MM-DD")
      );

      // ✅ only send if limited
      if (quantityType === "limited") {
        formData.append("usageLimit", values.usageLimit);
      }

      if (fileList.length > 0) {
        formData.append("image", fileList[0].originFileObj);
      }

      const res = await addCoupon(formData);

      if (res?.data?.success) {
        message.success(res.data.message);
        handleCancel();
      } else {
        message.error("Something went wrong");
      }
    } catch (error) {
      message.error("Failed to add coupon");
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
        {/* Image */}
        <Form.Item
          label="Coupon Image"
          required
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList.slice(-1))}
            beforeUpload={() => false}
            maxCount={1}
          >
            {fileList.length < 1 && (
              <div>
                <UploadOutlined />
                <div>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        {/* Coupon Code */}
        <Form.Item
          label="Coupon Code"
          name="couponCode"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        {/* Reason */}
        <Form.Item
          label="Coupon Reason"
          name="reasonName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        {/* Category */}
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select category">
            {categoryData?.data?.map((cat) => (
              <Option key={cat._id} value={cat._id}>
                {cat.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Quantity Type */}
        <Form.Item label="Quantity Type">
          <Select value={quantityType} onChange={setQuantityType}>
            <Option value="unlimited">Unlimited</Option>
            <Option value="limited">Limited</Option>
          </Select>
        </Form.Item>

        {/* Usage Limit */}
        {quantityType === "limited" && (
          <Form.Item
            label="Usage Limit"
            name="usageLimit"
            rules={[{ required: true }]}
          >
            <Input type="number" min={1} />
          </Form.Item>
        )}

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item name="startDate" label="Start Date" rules={[{ required: true }]}>
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item name="endDate" label="End Date" rules={[{ required: true }]}>
            <DatePicker className="w-full" />
          </Form.Item>
        </div>

        {/* Discount Type */}
        <Form.Item label="Discount Type">
          <Select value={discountType} onChange={setDiscountType}>
            <Option value="PERCENTAGE">Percentage (%)</Option>
            <Option value="FIXED_AMOUNT">Fixed Amount</Option>
          </Select>
        </Form.Item>

        {/* Discount Value */}
        <Form.Item
          label="Discount Value"
          name="discountValue"
          rules={[{ required: true }]}
        >
          <Input
            type="number"
            addonAfter={discountType === "PERCENTAGE" ? "%" : "$"}
          />
        </Form.Item>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-500 text-white py-3 rounded"
        >
          {loading ? <Spin /> : "Add Coupon"}
        </button>
      </Form>
    </Modal>
  );
};

export default AddCoupon;
