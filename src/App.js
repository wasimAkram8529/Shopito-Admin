import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Enquiries from "./pages/Enquiries";
import BlogList from "./pages/BlogList";
import BlogCategoryList from "./pages/BlogCategoryList";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import ColorList from "./pages/ColorList";
import CategoryList from "./pages/CategoryList";
import BrandList from "./pages/BrandList";
import ProductList from "./pages/ProductList";
import AddBlog from "./pages/AddBlog";
import AddBlogCat from "./pages/AddBlogCat";
import AddColor from "./pages/AddColor";
import AddCategory from "./pages/AddCategory";
import AddBrand from "./pages/AddBrand";
import AddProduct from "./pages/AddProduct";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoginStatus } from "./features/auth/authSlice";
import AddCoupon from "./pages/AddCoupon";
import CouponList from "./pages/CouponList";
import ViewEnquiry from "./pages/ViewEnquiry";
import EditOrder from "./pages/EditOrder";
import ViewOrder from "./pages/View-Order/ViewOrder";

function App() {
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="enquiries" element={<Enquiries />} />
          <Route path="enquiries/:id" element={<ViewEnquiry />} />

          <Route path="orders" element={<Orders />} />
          <Route path="view-order/:id" element={<ViewOrder />} />
          <Route path="edit-order/:id" element={<EditOrder />} />

          <Route path="customers" element={<Customers />} />

          <Route path="color" element={<AddColor />} />
          <Route path="color-list" element={<ColorList />} />
          <Route path="color/:id" element={<AddColor />} />

          <Route path="category" element={<AddCategory />} />
          <Route path="category-list" element={<CategoryList />} />
          <Route path="category/:id" element={<AddCategory />} />

          <Route path="brand" element={<AddBrand />} />
          <Route path="brand-list" element={<BrandList />} />
          <Route path="brand/update-brand/:id" element={<AddBrand />} />

          <Route path="add-product" element={<AddProduct />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="product/:id" element={<AddProduct />} />

          <Route path="blog" element={<AddBlog />} />
          <Route path="blog/:id" element={<AddBlog />} />
          <Route path="blog-list" element={<BlogList />} />

          <Route path="blog-category" element={<AddBlogCat />} />
          <Route path="blog-category/:id" element={<AddBlogCat />} />
          <Route path="blog-category-list" element={<BlogCategoryList />} />

          <Route path="coupon" element={<AddCoupon />} />
          <Route path="coupon-list" element={<CouponList />} />
          <Route path="coupon/:id" element={<AddCoupon />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/reset-Password/:id" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
