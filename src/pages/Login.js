import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, login } from "../features/auth/authSlice";
import Loader from "../components/loader/Loader";
import loginImg from "../assets/login.png";

let userSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  //console.log(isSuccess);

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("admin");
    }
    dispatch(RESET_AUTH());
  }, [isSuccess, isLoggedIn, dispatch, navigate]);
  return (
    <>
      {isLoading && <Loader />}
      <div className="auth-container">
        {/* <br />
        <br />
        <br />
        <br /> */}
        {/* <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4 login-class">
        </div> */}
        <div className="auth-img">
          <img src={loginImg} alt="Login image" />
        </div>
        <div className="auth-card">
          <h3 className="text-center">Login</h3>
          <div className="error text-center">{message}</div>
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              name="email"
              type="text"
              placeholder="Email address"
              id="email"
              onCh={formik.handleChange("email")}
              val={formik.values.email}
            />
            <div className="error">
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>
            <CustomInput
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              onCh={formik.handleChange("password")}
              val={formik.values.password}
            />
            <div className="error">
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="my-3 text-end">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
            <button
              className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
              style={{ background: "#ffd333" }}
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
