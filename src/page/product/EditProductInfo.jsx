import { Form, Input, message, Modal, Select, Upload } from "antd";
import React, { useRef, useState } from "react";
import { Navigate } from "../../Navigate";
import JoditEditor from "jodit-react";

const { Option } = Select;

const EditProductInfo = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const productData = {
      productName: values.productName,
      category: values.category,
      subcategory: values.subcategory,
      price: values.price,
      discountPrice: values.discountPrice,
      shortDescription: values.shortDescription,
      description: content,
    };

    console.log("Final Product Data:", productData);
    message.success("Product Added Successfully!");
  };

  const config = {
    readonly: false,
    placeholder: "Start typing...",
    buttons: [
      "fontsize",
      "bold",
      "italic",
      "underline",
      "|",
      "font",
      "brush",
      "align",
    ],
  };

  return (
    <div className="bg-white p-3">
      <Navigate title={"Edit Product"} />
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        {/* Main Product Info */}
        <div className="grid grid-cols-3 gap-4">
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[
              { required: true, message: "Please enter the product name" },
            ]}
          >
            <Input
              style={{ height: "45px" }}
              placeholder="Enter product name"
            />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select style={{ height: "45px" }} placeholder="Select Category">
              <Option value="clothing">Clothing</Option>
              <Option value="electronics">Electronics</Option>
              <Option value="accessories">Accessories</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Subcategory"
            name="subcategory"
            rules={[{ required: true, message: "Please select a subcategory" }]}
          >
            <Select style={{ height: "45px" }} placeholder="Select Subcategory">
              <Option value="men">Men</Option>
              <Option value="women">Women</Option>
              <Option value="kids">Kids</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <Input
              type="number"
              style={{ height: "45px" }}
              placeholder="Enter price"
            />
          </Form.Item>

          <Form.Item
            label="Discount Price"
            name="discountPrice"
            rules={[
              { required: true, message: "Please enter the discount price" },
            ]}
          >
            <Input
              type="number"
              style={{ height: "45px" }}
              placeholder="Enter discount price"
            />
          </Form.Item>
        </div>

        {/* Variant Section */}

        {/* Description */}
        <Form.Item label="Short Description" name="shortDescription">
          <Input.TextArea placeholder="Enter description" rows={4} />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
          />
        </Form.Item>

        {/* Submit */}
        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            className="px-4 py-3 w-full bg-[#D17C51] text-white rounded-md"
          >
            Add Product
          </button>
        </div>
      </Form>
    </div>
  );
};

export default EditProductInfo;
