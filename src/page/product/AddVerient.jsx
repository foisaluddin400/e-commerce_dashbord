import { Form, message, Select, Upload } from "antd";
import React, { useState } from "react";
import { Navigate } from "../../Navigate";
import { useGetColorCatQuery, useGetColorQuery, useGetSizeCatQuery, useGetSizeQuery } from "../redux/api/categoryApi";
import { useCreateProductVeriantMutation } from "../redux/api/productApi";
import { useParams } from "react-router-dom";

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
  const { id } = useParams();
  const { data: colorData } = useGetColorCatQuery();
  console.log(colorData)
  const { data: sizeData } = useGetSizeCatQuery();
  const [addVerientProduct] = useCreateProductVeriantMutation();

  const [frontImageList, setFrontImageList] = useState([]);
  const [backImageList, setBackImageList] = useState([]);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      // Images
      frontImageList.forEach((file) => {
        formData.append("frontImage", file.originFileObj);
      });
      backImageList.forEach((file) => {
        formData.append("backImage", file.originFileObj);
      });

      // Other fields
      formData.append("color", values.color); 
      values.size.forEach((sizeId) => formData.append("size", sizeId)); 
      formData.append("stockStatus", values.stockStatus);
      formData.append("status", values.status);

      const res = await addVerientProduct({ formData, id }).unwrap();
      message.success(res.message);
      form.resetFields();
      setFrontImageList([]);
      setBackImageList([]);
    } catch (error) {
      console.error(error);
      message.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white p-3">
      <Navigate title={"Add Product Variant"} />
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <div>
          <h3 className="font-semibold mb-4">Product Variants</h3>

          {/* Color Select */}
          <Form.Item
            label="Color"
            name="color"
            rules={[{ required: true, message: "Please select a color" }]}
          >
            <Select style={{ height: "45px" }} placeholder="Select Color">
              {colorData?.data?.map((color) => (
                <Option key={color._id} value={color._id}>
                  <span
                    style={{
                      display: "inline-block",
                      width: "15px",
                      height: "15px",
                      backgroundColor: color.hexValue,
                      borderRadius: "50%",
                      marginRight: "8px",
                    }}
                  ></span>
                  {color.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Size Select */}
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
            >
              {sizeData?.data?.map((size) => (
                <Option key={size._id} value={size._id}>
                  {size.name}
                </Option>
              ))}
            </Select>
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
            <Select style={{ height: "45px" }} placeholder="Select Stock Status">
              <Option value="In Stock">In Stock</Option>
              <Option value="Stock Out">Stock Out</Option>
           
            </Select>
          </Form.Item>

          {/* Image Upload */}
          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Front Image" name="frontImage">
              <Upload
                listType="picture-card"
                fileList={frontImageList}
                onChange={({ fileList }) => setFrontImageList(fileList)}
                onPreview={onPreview}
                multiple={false}
                accept="image/*"
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
            className="px-4 py-3 w-full bg-[#E63946] text-white rounded-md"
          >
            Add Product
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AddVerient;
