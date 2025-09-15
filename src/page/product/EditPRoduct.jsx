import { Form, Input, message, Modal, Select, Upload } from "antd";
import React, { useRef, useState } from "react";
import { Navigate } from "../../Navigate";
import JoditEditor from "jodit-react";

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
  imgWindow?.document.write(image.outerHTML);
};

const EditPRoduct = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [frontImageList, setFrontImageList] = useState([]);
  const [backImageList, setBackImageList] = useState([]);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    console.log("Form Values:", values);
    message.success("Product Added Successfully!");
  };
  const config = {
    readonly: false,
    placeholder: "Start typings...",

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
        {/* Product Name */}
        <div className="grid grid-cols-3 gap-4">
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[
              { required: true, message: "Please enter the product name" },
            ]}
          >
            <Input style={{height:'45px'}} placeholder="Enter product name" />
          </Form.Item>

          {/* Category */}
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select style={{height:'45px'}} placeholder="Select Category">
              <Option value="clothing">Clothing</Option>
              <Option value="electronics">Electronics</Option>
              <Option value="accessories">Accessories</Option>
            </Select>
          </Form.Item>

          {/* Subcategory */}
          <Form.Item
            label="Subcategory"
            name="subcategory"
            rules={[{ required: true, message: "Please select a subcategory" }]}
          >
            <Select style={{height:'45px'}} placeholder="Select Subcategory">
              <Option value="men">Men</Option>
              <Option value="women">Women</Option>
              <Option value="kids">Kids</Option>
            </Select>
          </Form.Item>
        </div>

        {/* Price */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <Input style={{height:'45px'}} type="number" placeholder="Enter price" />
          </Form.Item>

          {/* Discount Price */}
          <Form.Item
            label="Discount Price"
            name="discountPrice"
            rules={[
              { required: true, message: "Please enter the discount price" },
            ]}
          >
            <Input style={{height:'45px'}} type="number" placeholder="Enter discount price" />
          </Form.Item>
        </div>

        {/* Front Image */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="Front Image" name="frontImage">
            <Upload
              listType="picture-card"
              fileList={frontImageList}
              onChange={({ fileList }) => setFrontImageList(fileList)}
              onPreview={onPreview}
              multiple={false}
              accept="image/*"
              style={{ width: "100%", height: "200px" }}
            >
              {frontImageList.length < 1 && "+ Upload"}
            </Upload>
          </Form.Item>

          {/* Back Image */}
          <Form.Item label="Back Image" name="backImage">
            <Upload
              listType="picture-card"
              fileList={backImageList}
              onChange={({ fileList }) => setBackImageList(fileList)}
              onPreview={onPreview}
              multiple={false}
              accept="image/*"
              style={{ width: "100%", height: "200px" }}
            >
              {backImageList.length < 1 && "+ Upload"}
            </Upload>
          </Form.Item>
        </div>

        {/* Color */}
        <div className="grid grid-cols-4 gap-4">
          <Form.Item
            label="Color"
            name="color"
            rules={[{ required: true, message: "Please select a color" }]}
          >
            <Select style={{height:'45px'}} placeholder="Select Color">
              <Option value="red">Red</Option>
              <Option value="yellow">Yellow</Option>
              <Option value="black">Black</Option>
              <Option value="green">Green</Option>
            </Select>
          </Form.Item>

          {/* Size */}
          <Form.Item
            label="Size"
            name="size"
            rules={[{ required: true, message: "Please select a size" }]}
          >
            <Select style={{height:'45px'}} placeholder="Select Size">
              <Option value="S">S</Option>
              <Option value="M">M</Option>
              <Option value="L">L</Option>
              <Option value="XL">XL</Option>
            </Select>
          </Form.Item>

          {/* Status */}
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select style={{height:'45px'}} placeholder="Select Status">
              <Option value="Visible">Visible</Option>
              <Option value="Hidden">Hidden</Option>
            </Select>
          </Form.Item>

          {/* Stock Status */}
          <Form.Item
            label="Stock Status"
            name="stockStatus"
            rules={[{ required: true, message: "Please select stock status" }]}
          >
            <Select style={{height:'45px'}} placeholder="Select Stock Status">
              <Option value="In Stock">In Stock</Option>
              <Option value="Stock Out">Stock Out</Option>
              <Option value="Upcoming">Upcoming</Option>
            </Select>
          </Form.Item>
        </div>
        {/* Description */}
        <Form.Item
          label="Short Description"
          name="shortDescription"
          rules={[{ required: true, message: "Please enter Short description" }]}
        >
          <Input.TextArea placeholder="Enter description" rows={4} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
            // onChange={newContent => { }}
          />
        </Form.Item>

        {/* Submit Button */}
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

export default EditPRoduct;
