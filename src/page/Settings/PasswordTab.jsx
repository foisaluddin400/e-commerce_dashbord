import { Button, Form, Input, message, Spin } from "antd";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../redux/api/userApi";

export const PasswordTab = () => {
  const [changePassword] = useChangePasswordMutation();
  const [loading, setLoading] = useState(false);
  const [passError, setPassError] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = async (values) => {
    if (values?.newPassword === values.oldPassword) {
      return setPassError("Your old password cannot be your new password.");
    }
    if (values?.newPassword !== values?.confirmPassword) {
      return setPassError("Confirm password doesn't match.");
    } else {
      setPassError("");
    }

    const data = {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    };
    setLoading(true);
    try {
      const response = await changePassword(data).unwrap();
      message.success(response.message);
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      message.error(error.data.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <Form layout="vertical" onFinish={handlePasswordChange}>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Change Your Password
        </h2>

        <Form.Item
          name="currentPassword"
          label="Old Password"
          rules={[
            { required: true, message: "Please enter your current password!" },
          ]}
        >
          <Input.Password
            style={{ padding: "9px", borderRadius: "0px" }}
            placeholder="Old Password"
          />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[{ required: true, message: "Please enter a new password!" }]}
        >
          <Input.Password
            style={{ padding: "9px", borderRadius: "0px" }}
            placeholder="New Password"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm New Password"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Please confirm your new password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password
            style={{ padding: "9px", borderRadius: "0px" }}
            placeholder="Confirm Password"
          />
        </Form.Item>

        {/* Display error if password validations fail */}
        {passError && <p className="text-red-500 text-sm mb-2">{passError}</p>}

        <Form.Item>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-[#E63946] text-white py-2"
              disabled={loading}
            >
                 {loading ? (
              <>
                <Spin size="small" /> <span>Submitting...</span>
              </>
            ) : (
              "Submit"
            )}
            </button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
