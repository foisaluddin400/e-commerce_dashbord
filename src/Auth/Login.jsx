import { Button, Checkbox, Form, Input, message } from "antd";
import img from "../assets/header/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebookF } from "react-icons/fa";
// import { useEffect, useRef, useState } from "react";
// import { useLoginAdminMutation } from "../page/redux/api/userApi";
// import { setToken } from "../page/redux/features/auth/authSlice";
// import { useDispatch } from "react-redux";
const Login = () => {
  // const [loginAdmin] = useLoginAdminMutation();
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log(values);
    // try {
    //   const payload = await loginAdmin(values).unwrap();
    //   console.log(payload);
    //   if (payload?.success) {
    //     dispatch(setToken(payload?.data?.accessToken));
    //     message.success(payload?.message);
    //     navigate("/");
    //   } else {
    //     message.error(payload?.message || "Login failed!");
    //   }
    // } catch (error) {
    //   console.error("Login error:", error);
    //   message.error(error?.data?.message || "Something went wrong. Try again!");
    // } finally {
    // }
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
            rules={[{ required: true, message: "Please input your password!" }]}
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
              htmlType="submit"
              className="w-full bg-[#E63946] py-3 text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Continue
            </button>
          </Form.Item>
        </Form>

 

        {/* Divider */}
        <div className="flex items-center mb-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">Or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google */}
        <Button
          style={{ height: "50px" }}
          block
          className="flex items-center justify-center border border-gray-300 mb-3"
        >
          <FaGoogle className="text-red-500 mr-2" /> Continue With Google
        </Button>

        {/* Facebook */}
        <Button
          style={{ height: "50px" }}
          block
          className="flex items-center justify-center border border-gray-300"
        >
          <FaFacebookF className="text-blue-600 mr-2" /> Continue With Facebook
        </Button>

        {/* Sign In Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don.t have an account?{" "}
          <Link to={"/auth/signUp"}>
            {" "}
            <span className="text-blue-600 cursor-pointer">Sign Up</span>
          </Link>
        </p>
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
