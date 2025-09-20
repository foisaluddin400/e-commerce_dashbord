import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/dashboardLayout/DashboardLayout";
import Dashboard from "../components/Dashboard/Dashboard";
import UserManagement from "../page/UserManagement/UserManagement";
import CreatorManagement from "../page/CreatorManagement/CreatorManagement";

import Subscription from "../page/Subscription/Subscription";

import Profile from "../page/Settings/Profile";
import TermsCondition from "../page/Settings/TermsCondition";
import FAQ from "../page/Settings/FAQ";
import PrivacyPolicy from "../page/Settings/PrivacyPolicy";
import Categories from "../page/CategoriesManagement/Categories";
import Subcategory from "../page/CategoriesManagement/Subcategory";

import ForgetPass from "../Auth/ForgetPass";
import Verify from "../Auth/Verify";
import ResetPass from "../Auth/ResetPass";
import Notification from "../page/Notification/Notification";
import About from "../page/Settings/About";
import Login from "../Auth/Login";
import Order from "../page/order/Order";
import Banner from "../page/bannar/Banner";
import SupportTab from "../page/support/SupportTab";
import AddProduct from "../page/product/AddProduct";
import Color from "../page/product/Color";
import ProductAddPage from "../page/product/ProductAddPage";
import EditPRoduct from "../page/product/EditPRoduct";
import SizePage from "../page/product/SizePage";
import Blog from "../page/blog/Blog";
import BlogDetails from "../page/blog/BlogDetails";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
import MainProduct from "../page/product/MainProduct";
import AddVerient from "../page/product/AddVerient";
import EditProductInfo from "../page/product/EditProductInfo";
import Brands from "../page/brands/Brands";


export const router = createBrowserRouter([
  {
    path: "/",
    element: (
     
        <ProtectedRoute><DashboardLayout></DashboardLayout></ProtectedRoute>
      
    ),
    children: [
      {
        path: "/",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard/UserManagement",
        element: <UserManagement></UserManagement>,
      },
      {
        path: "/dashboard/CreatorManagement",
        element: <CreatorManagement></CreatorManagement>,
      },
      {
        path: "/dashboard/CategoriesManagement/Categories",
        element: <Categories></Categories>,
      },
      {
        path: "/dashboard/CategoriesManagement/Categories",
        element: <Categories></Categories>,
      },
      {
        path: "/dashboard/CategoriesManagement/Subcategory",
        element: <Subcategory></Subcategory>,
      },
      {
        path: "/dashboard/Subscription",
        element: <Subscription></Subscription>,
      },
        {
        path: "/dashboard/order",
        element: <Order></Order>
      },
       {
        path: "/dashboard/banner",
        element: <Banner></Banner>
      },
       {
        path: "/dashboard/product",
        element: <MainProduct></MainProduct>
      },
      {
        path: "/dashboard/product-verient/:id",
        element: <AddProduct></AddProduct>
      },
      {
        path: "/dashboard/add-product",
        element: <ProductAddPage></ProductAddPage>
      },
      {
        path: "/dashboard/edit-productInfo/:id",
        element: <EditProductInfo></EditProductInfo>
      },
        {
        path: "/dashboard/add-verient/:id",
        element: <AddVerient></AddVerient>
      },
        {
        path: "/dashboard/edit-product/:productId/:variantId",
        element: <EditPRoduct></EditPRoduct>
      },
      {
        path: "/dashboard/color",
        element:<Color></Color>
      },
        {
        path: "/dashboard/brands",
        element:<Brands></Brands>
      },
      {
        path: "/dashboard/size",
        element:<SizePage></SizePage>
      },
        {
        path: "/dashboard/blogs",
        element:<Blog></Blog>
      },
           {
        path: "/dashboard/blog-details/:id",
        element:<BlogDetails></BlogDetails>
      },
      {
        path: "/dashboard/support",
        element: <SupportTab></SupportTab>
      },
      {
        path: "/dashboard/Settings/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/Settings/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/Settings/notification",
        element: <Notification></Notification>,
      },
      {
        path: "/dashboard/Settings/Terms&Condition",
        element: <TermsCondition></TermsCondition>,
      },
      {
        path: "/dashboard/Settings/FAQ",
        element: <FAQ></FAQ>,
      },
      {
        path: "/dashboard/Settings/aboutUs",
        element: <About></About>,
      },
      {
        path: "/dashboard/Settings/PrivacyPolicy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
    ],
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/forgetpassword",
    element: <ForgetPass></ForgetPass>,
  },
  {
    path: "/verify",
    element: <Verify></Verify>,
  },
  {
    path: "/reset",
    element: <ResetPass></ResetPass>,
  },
]);
