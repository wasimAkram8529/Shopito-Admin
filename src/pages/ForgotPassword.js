import React from "react";
import CustomInput from "../components/CustomInput";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../features/auth/authSlice";
import { ShowOnLogout } from "../components/hiddenLink/hiddenLink";
import forgotImg from "../assets/forgot.png";

let forgotSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotSchema,
    onSubmit: (values) => {
      dispatch(forgotPassword(values));
      formik.resetForm();
    },
  });

  const { message } = useSelector((state) => state.auth);
  // console.log(formik.values.email);
  return (
    <ShowOnLogout>
      <div className="auth-container">
        <div className="auth-img">
          <img src={forgotImg} alt="Forgot password" />
        </div>
        <div className="auth-card">
          <h3 className="text-center">Forgot Password</h3>
          {message ===
          "Password Reset Link is Sent to Your Mail Please Check" ? (
            <div className="text-center">{message}</div>
          ) : (
            <p className="text-center">
              Enter your register email to reset your password.
            </p>
          )}
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              name="email"
              type="text"
              placeholder="Email Address"
              id="email"
              onCh={formik.handleChange("email")}
              val={formik.values.email}
            />
            <div className="error">
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="mt-3 d-flex gap-15 align-items-center">
              <button className="button border-0 w-50" type="submit">
                Submit
              </button>
              <NavLink
                style={{ textDecoration: "none" }}
                className="button w-50"
                to="/"
              >
                Cancel
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </ShowOnLogout>
  );
};

export default ForgotPassword;
