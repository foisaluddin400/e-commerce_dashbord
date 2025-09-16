import { Form, Input, message, Modal, Select, Upload } from "antd";
import React, { useRef, useState } from "react";
import { Navigate } from "../../Navigate";

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

const AddVerient = () => {

  const [frontImageList, setFrontImageList] = useState([]);
  const [backImageList, setBackImageList] = useState([]);
  const [form] = Form.useForm();



  const handleSubmit = async (values) => {
    if (variants.length === 0) {
      message.error("Please add at least one variant");
      return;
    }

    const productData = {

    };

    console.log("Final Product Data:", productData);
    message.success("Product Added Successfully!");
  };

  return (
    <div className="bg-white p-3">
      <Navigate title={"Add Product Verient"} />
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        {/* Main Product Info */}

        <div className="">
          <h3 className="font-semibold mb-4">Product Variants</h3>

          {/* Color */}
          <Form.Item
            label="Color"
            name="color"
            rules={[{ required: true, message: "Please select a color" }]}
          >
            <Select style={{ height: "45px" }} placeholder="Select Color">
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
            rules={[
              { required: true, message: "Please select at least one size" },
            ]}
          >
            <Select
              mode="multiple"
              style={{ width: "100%", height: "45px" }}
              placeholder="Select Sizes"
              options={[
                { value: "S", label: "S" },
                { value: "M", label: "M" },
                { value: "L", label: "L" },
                { value: "XL", label: "XL" },
              ]}
            />
          </Form.Item>

          {/* Status */}

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select style={{ height: "45px" }} placeholder="Select Status">
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
            <Select
              style={{ height: "45px" }}
              placeholder="Select Stock Status"
            >
              <Option value="In Stock">In Stock</Option>
              <Option value="Stock Out">Stock Out</Option>
              <Option value="Upcoming">Upcoming</Option>
            </Select>
          </Form.Item>

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
      
        </div>

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

export default AddVerient;
