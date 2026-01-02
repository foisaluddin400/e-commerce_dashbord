import { useState, useEffect } from "react";
import { Avatar, Upload, Form, Input, Button, message, Spin } from "antd";
import { IoCameraOutline } from "react-icons/io5";
import { PasswordTab } from "./PasswordTab";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../redux/api/userApi";
import { imageUrl } from "../redux/api/baseApi";

const Profile = () => {
    const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [updateProfile] = useUpdateProfileMutation();
  const [form] = Form.useForm();
  const [image, setImage] = useState();
  const { data: profile } = useGetProfileQuery();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        firstName: profile?.data?.firstName,
        lastName: profile?.data?.lastName,
        email: profile?.data?.email,
        phone: profile?.data?.phone,
      });
    }
  }, [profile, form]);

  const onEditProfile = async (values) => {
    const data = new FormData();
    if (image) data.append("image", image);
    data.append("firstName", values.firstName);
    data.append("lastName", values.lastName);
    data.append("phone", values.phone);
    setLoading(true);
    try {
      const response = await updateProfile(data).unwrap();
      console.log(response);
      message.success(response.message);
      setLoading(false);
    } catch (error) {
      message.error(error.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  const tabItems = [
    {
      key: "1",
      label: "Edit Profile",
      content: (
        <Form onFinish={onEditProfile} layout="vertical" form={form}>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="firstName" label="First Name">
              <Input
                style={{ padding: "9px", borderRadius: "0px" }}
                placeholder="Enter First Name"
                rules={[{ required: true, message: "Please write First Name" }]}
              />
            </Form.Item>

            <Form.Item name="lastName" label="Last Name">
              <Input
                style={{ padding: "9px", borderRadius: "0px" }}
                placeholder="Enter Last Name"
                rules={[{ required: true, message: "Please write Last Name" }]}
              />
            </Form.Item>
          </div>

          <Form.Item name="email" label="Email">
            <Input
              disabled
              style={{ padding: "9px", borderRadius: "0px" }}
              placeholder="Enter Email"
              rules={[{ required: true, message: "Please write a Email" }]}
            />
          </Form.Item>

          <Form.Item name="phone" label="Phone Number">
            <Input
              style={{ padding: "9px", borderRadius: "0px" }}
              placeholder="Enter Phone Number"
              rules={[{ required: true, message: "Please write a Number" }]}
            />
          </Form.Item>

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
        </Form>
      ),
    },
    {
      key: "2",
      label: "Change Password",
      content: <PasswordTab />,
    },
  ];

  return (
    <div className="p-3 bg-white">
      <div className="">
        <div className="max-w-xl mx-auto mt-8 rounded-lg p-6 ">
          {/* Profile Picture Section */}
          <div className="text-center mb-6">
            <div className="relative w-[140px] h-[124px] mx-auto">
              <input
                type="file"
                onChange={handleImageChange}
                id="img"
                style={{ display: "none" }}
              />
              <img
                style={{ width: 140, height: 140, borderRadius: "100%" }}
                src={`${imageUrl}${profile?.data?.imageUrl}`}
                alt="Admin Profile"
              />
              {activeTab === "1" && (
                <label
                  htmlFor="img"
                  className="absolute top-[80px] -right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
                >
                  <IoCameraOutline className="text-black " />
                </label>
              )}
            </div>

            <p className="text-lg font-semibold mt-4">foisal</p>
          </div>

          {/* Custom Tabs Section */}
          <div className="mb-4">
            <div className="flex space-x-6 justify-center mb-4">
              {tabItems.map((item) => (
                <button
                  key={item.key}
                  className={`py-2 font-medium ${
                    activeTab === item.key
                      ? "border-b border-[#E63946] text-[#E63946]"
                      : "text-black hover:text-[#02111E]"
                  }`}
                  onClick={() => setActiveTab(item.key)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div>
              {tabItems.find((item) => item.key === activeTab)?.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
