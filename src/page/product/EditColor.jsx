import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Spin, message } from "antd";
import { useUpdateColorMutation } from "../redux/api/categoryApi";

const EditColor = ({ editModal, setEditModal, selectedCategory }) => {
  const [form] = Form.useForm();
  const [colorHex, setColorHex] = useState("#000000");
  const [updateColor] = useUpdateColorMutation();
  const [loading, setLoading] = useState(false);
  // 🟢 Set default form values when selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      form.setFieldsValue({
        colorName: selectedCategory.title,
        chooseColor: selectedCategory.hex,
        colorHex: selectedCategory.hex,
      });
      setColorHex(selectedCategory.hex);
    }
  }, [selectedCategory, form]);

  const handleCancel = () => {
    form.resetFields();
    setColorHex("#000000");
    setEditModal(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = {
        name: values.colorName,
        hexValue: values.colorHex,
      };

      const res = await updateColor({
        formData,
        id: selectedCategory.key,
      }).unwrap();
      console.log("API Response:", res);

      message.success("Color updated successfully!");
      setLoading(false);
      handleCancel();
    } catch (err) {
      console.error(err);
      setLoading(false);
      message.error("Failed to update color");
    }
  };

  const handleColorPickerChange = (e) => {
    setColorHex(e.target.value);
    form.setFieldsValue({ colorHex: e.target.value });
  };

  const handleHexInputChange = (e) => {
    const val = e.target.value;
    setColorHex(val);
    form.setFieldsValue({ colorHex: val });
  };

  return (
    <Modal
      centered
      open={editModal}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <div className="mb-6 mt-4">
        <h2 className="text-center font-bold text-lg mb-6">Edit Color</h2>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          {/* Color Name */}
          <Form.Item
            label="Color Name"
            name="colorName"
            rules={[{ required: true, message: "Please enter color name" }]}
          >
            <Input style={{ height: "45px" }} placeholder="Enter color name" />
          </Form.Item>

          {/* Choose Color */}
          <Form.Item
            label="Choose Color"
            name="chooseColor"
            rules={[{ required: true, message: "Please select a color" }]}
          >
            <input
              type="color"
              value={colorHex}
              onChange={handleColorPickerChange}
              className="w-full h-16 cursor-pointer border rounded"
            />
          </Form.Item>

          {/* Color Hex Code */}
          <Form.Item
            label="Color Hex Code"
            name="colorHex"
            rules={[
              { required: true, message: "Please enter a hex code" },
              {
                pattern: /^#([0-9A-Fa-f]{6})$/,
                message: "Enter a valid hex code (e.g., #FF0000)",
              },
            ]}
          >
            <Input
              style={{ height: "45px" }}
              value={colorHex}
              onChange={handleHexInputChange}
              placeholder="#000000"
            />
          </Form.Item>

          {/* Buttons */}
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

export default EditColor;
