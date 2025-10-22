import { Button, Checkbox, Form, Input, message, Spin } from "antd";
import img from "../assets/header/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebookF } from "react-icons/fa";
import { useLoginAdminMutation } from "../page/redux/api/userApi";
import { useDispatch } from "react-redux";
import { setToken } from "../page/redux/features/auth/authSlice";
import { useState } from "react";

const Login = () => {
  const [loginAdmin] = useLoginAdminMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log(values);
    setLoading(true);
    try {
      const payload = await loginAdmin(values).unwrap();
      console.log(payload);
      if (payload) {
        dispatch(setToken(payload?.data?.accessToken));
        message.success(payload?.message);
        setLoading(false);
        navigate("/");
      } else {
        message.error(payload?.message );
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
      message.error(error?.data?.message || "Server is down");
    } finally {
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-2 ">
      <div className=" min-h-screen flex items-center justify-center">
        <div className="">
          <div className=" md:px-16 px-5 py-16  w-[600px] rounded">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Login to Account
              </h2>
              <p className="pb-7">
                Please enter your email and password to continue
              </p>
            </div>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              {/* Email */}
              <Form.Item
                label="Enter Email Address"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Enter a valid email!" },
                ]}
              >
                <Input
                  style={{ height: "50px" }}
                  placeholder="Enter Email Address"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  style={{ height: "50px" }}
                  className=""
                  placeholder="••••••••"
                />
              </Form.Item>

              <div className="flex items-center justify-between mb-4">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox className="text-gray-700">Remember me</Checkbox>
                </Form.Item>
                <Link
                  to={"/forgetpassword"}
                  className="text-sm text-[#2F799E] hover:underline focus:outline-none"
                >
                  Forget password?
                </Link>
              </div>

              {/* Continue Button */}
              <Form.Item>
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
                      "Log In"
                    )}
                  </button>
              </Form.Item>
            </Form>

          
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <img className="h-screen w-full" src={img} alt="" />
      </div>
    </div>
  );
};

export default Login;
