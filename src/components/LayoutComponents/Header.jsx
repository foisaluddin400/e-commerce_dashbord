import { LuBell } from "react-icons/lu";
import profilee from "../../../src/assets/header/profileLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import { useEffect, useRef, useState } from "react";
import { Drawer, Radio, Space } from "antd";

import dashboard from "../../assets/routerImg/dashboard.png";
import categorie from "../../assets/routerImg/categorie.png";
import create from "../../assets/routerImg/create.png";
import settings from "../../assets/routerImg/settings.png";
import subscription from "../../assets/routerImg/subscription.png";
import user from "../../assets/routerImg/user.png";
import logo from "../../assets/header/logo.png";

import { FaChevronRight } from "react-icons/fa";

import { IoIosLogIn } from "react-icons/io";
import { useGetNotificationQuery, useReadNotificationMutation } from "../../page/redux/api/metaApi";

const items = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: dashboard,
    link: "/",
  },
  {
    key: "userManagement",
    label: "User Management",
    icon: user,
    link: "/dashboard/UserManagement",
  },
  {
    key: "creatorManagement",
    label: "Creator Management",
    icon: create,
    link: "/dashboard/CreatorManagement",
  },
  {
    key: "categoriesManagement",
    label: "Categories Management",
    icon: categorie,
    link: "/dashboard/CategoriesManagement/Categories",
    children: [
      {
        key: "categoriesManagement",
        label: "Categories",
        link: "/dashboard/CategoriesManagement/Categories",
      },
      {
        key: "subcategory",
        label: "Subcategory",
        link: "/dashboard/CategoriesManagement/Subcategory",
      },
    ],
  },
  {
    key: "subscription",
    label: "Subscription",
    icon: subscription,
    link: "/dashboard/Subscription",
  },
  {
    key: "profile",
    label: "Settings",
    icon: settings,
    link: "/dashboard/Settings/profile",
    children: [
      {
        key: "profile",
        label: "Profile",
        link: "/dashboard/Settings/profile",
      },
      {
        key: "terms",
        label: "Terms & Condition",
        link: "/dashboard/Settings/Terms&Condition",
      },
      {
        key: "privacy",
        label: "Privacy Policy",
        link: "/dashboard/Settings/PrivacyPolicy",
      },
      {
        key: "faq",
        label: "FAQ",
        link: "/dashboard/Settings/FAQ",
      },
    ],
  },
];

const Header = () => {
  const { data: notificationData } = useGetNotificationQuery();
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [expandedKeys, setExpandedKeys] = useState([]);
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
const [notificationRead] = useReadNotificationMutation();
  const contentRef = useRef({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      title: "New task assigned",
      message: "You have been assigned to 'Fix leaking tap'",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      title: "Payment received",
      message: "₦2,500 payment has been processed",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "Task completed",
      message: "Your task 'House cleaning' is completed",
      time: "2 hours ago",
      unread: false,
    },
  ];
  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const onClick = (key) => {
    setSelectedKey(key);
  };

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const handleReadAll = () => {
    notificationRead();
    // Logic to mark all notifications as read
    console.log("Mark all notifications as read");
  }
  return (
    <div className=" text-black pt-4 border-b">
      <div className="flex justify-between">
        <div className="lg:hidden ">
          <div className=" pl-4">
            <div onClick={showDrawer} className="text-3xl ">
              <FaBars />
            </div>
          </div>
        </div>
        <div></div>
        <div className="flex gap-8  px-6">
          <div className="relative " ref={notificationRef}>
            <div
              onClick={() => {
                setIsNotificationOpen(!isNotificationOpen);
                setIsProfileOpen(false);
              }}
              className="w-[45px] cursor-pointer h-[45px] flex items-center justify-center text-xl rounded-full bg-gray-100 text-black "
            >
              <span>
                <LuBell />
              </span>
            </div>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">
                      Notifications
                    </h3>
                    <button onClick={handleReadAll} className="text-blue-500">All read</button>
                    <span className="text-xs bg-[#E63946] text-white px-2 py-1 rounded-full">
                      {notificationData?.data?.filter(
                        (n) => n.status === "UNREAD"
                      ).length || 0}
                      <space></space> New
                    </span>
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notificationData?.data?.map((notification) => {
                    const isUnread = notification.status === "UNREAD";

                    return (
                      <div
                        key={notification._id}
                        className={`p-4 border-b border-gray-100 cursor-pointer transition-colors
        ${isUnread ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-gray-50"}
      `}
                      >
                        <div className="flex items-start gap-3">
                          {isUnread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          )}

                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-gray-900 mb-1">
                              {notification.title}
                            </p>

                            <p className="text-xs text-gray-600 mb-2">
                              {notification.message}
                            </p>

                            <p className="text-xs text-gray-400">
                              {new Date(
                                notification.createdAt
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* 
            <div className="p-3 border-t border-gray-200 text-center">
              <button className="text-sm text-[#115e59] hover:text-[#0d4a42] font-medium">
                View all notifications
              </button>
            </div> */}
              </div>
            )}

            <Space>
              <Radio.Group value={placement} onChange={onChange}></Radio.Group>
            </Space>
            <Drawer
              placement={placement}
              closable={false}
              onClose={onClose}
              open={open}
              key={placement}
            >
              <div className="bg-black h-screen -m-6">
                <div className="custom-sidebar-logo flex justify-center ">
                  <img src={logo} alt="Logo" className="w-[160px]" />
                </div>

                <div className="menu-items">
                  {items.map((item) => (
                    <div key={item.key}>
                      <Link
                        to={item.link}
                        className={`menu-item my-4 mx-5 py-3 px-3 flex items-center cursor-pointer ${
                          selectedKey === item.key
                            ? "bg-[#EDC4C5] rounded-md"
                            : "bg-white rounded-md hover:bg-gray-200"
                        }`}
                        onClick={(e) => {
                          if (item.children) {
                            e.preventDefault();
                            onParentClick(item.key);
                          } else {
                            setSelectedKey(item.key);
                            onClose();
                          }
                        }}
                      >
                        <img
                          src={item.icon}
                          alt={item.label}
                          className="w-5 h-5 mr-3"
                        />
                        <span className="block w-full text-black">
                          {item.label}
                        </span>

                        {item.children && (
                          <FaChevronRight
                            className={`ml-auto transform text-[10px] transition-all duration-300 ${
                              expandedKeys.includes(item.key) ? "rotate-90" : ""
                            }`}
                          />
                        )}
                      </Link>

                      {item.children && (
                        <div
                          className={`children-menu bg-white  -my-2 mx-5  text-black transition-all duration-300 ${
                            expandedKeys.includes(item.key) ? "expanded" : ""
                          }`}
                          style={{
                            maxHeight: expandedKeys.includes(item.key)
                              ? `${
                                  contentRef.current[item.key]?.scrollHeight
                                }px`
                              : "0",
                          }}
                          ref={(el) => (contentRef.current[item.key] = el)}
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.key}
                              to={child.link}
                              className={`menu-item p-4  flex items-center cursor-pointer ${
                                selectedKey === child.key
                                  ? "bg-[#EDC4C5]"
                                  : "hover:bg-gray-200"
                              }`}
                              onClick={() => {
                                setSelectedKey(child.key);
                                setExpandedKeys([]); // Collapse all expanded items
                                onClose(); // Close the drawer navigation
                              }}
                            >
                              <span className="block w-full text-black">
                                {child.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="custom-sidebar-footer absolute bottom-0 w-full p-4 ">
                  <button
                    onClick={handleLogout}
                    className="w-full flex bg-white text-start rounded-md text-black p-3"
                  >
                    <span className="text-2xl">
                      <IoIosLogIn />
                    </span>
                    <span className="ml-3">Log Out</span>
                  </button>
                </div>
              </div>
            </Drawer>

            <span className="absolute top-0 right-0 -mr-2  w-5 h-5 bg-[#E63946] text-white text-xs flex items-center justify-center rounded-full">
              {notificationData?.data?.filter((n) => n.status === "UNREAD")
                .length || 0}
            </span>
          </div>

          <Link to={"/dashboard/Settings/profile"}>
            <div className="flex gap-3">
              <div>
                <img
                  className="w-[45px] h-[45px]"
                  src={profilee}
                  alt="profile"
                />
              </div>
              <div className="text-end">
                <h3>{"Loading..."}</h3>
                <h4 className="text-sm">Admin</h4>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
