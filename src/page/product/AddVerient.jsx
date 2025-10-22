import { Form, message, Select, Spin, Upload } from "antd";
import React, { useState } from "react";
import { Navigate } from "../../Navigate";
import {
  useGetColorCatQuery,
  useGetColorQuery,
  useGetSizeCatQuery,
  useGetSizeQuery,
} from "../redux/api/categoryApi";
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
  console.log(colorData);
  const [loading, setLoading] = useState(false);
  const { data: sizeData } = useGetSizeCatQuery();
  const [addVerientProduct] = useCreateProductVeriantMutation();

  const [frontImageList, setFrontImageList] = useState([]);
  const [backImageList, setBackImageList] = useState([]);
  const [rightImageList, setRightImageList] = useState([]);
  const [leftImageList, setLeftImageList] = useState([]);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Required Images
      frontImageList.forEach((file) =>
        formData.append("frontImage", file.originFileObj)
      );
      backImageList.forEach((file) =>
        formData.append("backImage", file.originFileObj)
      );

      // Optional Images
      rightImageList.forEach((file) =>
        formData.append("rightImage", file.originFileObj)
      );
      leftImageList.forEach((file) =>
        formData.append("leftImage", file.originFileObj)
      );

      // Other fields
      formData.append("color", values.color);
      values.size.forEach((sizeId) => formData.append("size", sizeId));
      formData.append("stockStatus", values.stockStatus);
      formData.append("status", values.status);

      const res = await addVerientProduct({ formData, id }).unwrap();
      message.success(res.message);
      setLoading(false);
      // Reset form and images
      form.resetFields();
      setFrontImageList([]);
      setBackImageList([]);
      setRightImageList([]);
      setLeftImageList([]);
    } catch (error) {
      console.error(error);
      setLoading(false);
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
            <Select
              style={{ height: "45px" }}
              placeholder="Select Stock Status"
            >
              <Option value="In Stock">In Stock</Option>
              <Option value="Stock Out">Stock Out</Option>
            </Select>
          </Form.Item>

          {/* Image Upload */}
          <div className="grid grid-cols-4 gap-4">
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

            <Form.Item label="Right Image (Optional)">
              <Upload
                listType="picture-card"
                fileList={rightImageList}
                onChange={({ fileList }) => setRightImageList(fileList)}
                onPreview={onPreview}
                multiple={false}
                accept="image/*"
              >
                {rightImageList.length < 1 && "+ Upload"}
              </Upload>
            </Form.Item>

            <Form.Item label="Left Image (Optional)">
              <Upload
                listType="picture-card"
                fileList={leftImageList}
                onChange={({ fileList }) => setLeftImageList(fileList)}
                onPreview={onPreview}
                multiple={false}
                accept="image/*"
              >
                {leftImageList.length < 1 && "+ Upload"}
              </Upload>
            </Form.Item>
          </div>
        </div>

        {/* Submit */}
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
  );
};

export default AddVerient;
