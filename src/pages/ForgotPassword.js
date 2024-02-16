import React from "react";
import CustomInput from "../components/CustomInput";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../features/auth/authSlice";
import { ShowOnLogout } from "../components/hiddenLink/hiddenLink";

let forgotSchema = Yup.object().shape({
  email: Yup.string().email().required("Please Enter A Unique Email"),
});
const ForgotPassword = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotSchema,
    onSubmit: (values) => {
      //console.log(values);
      dispatch(forgotPassword(values));
      formik.resetForm();
    },
  });
  return (
    <ShowOnLogout>
      <div
        className="py-5"
        style={{ background: "#ffd333", minHeight: "100vh" }}
      >
        <br />
        <br />
        <br />
        <br />
        <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
          <h3 className="text-center">Forgot Password</h3>
          <p className="text-center">
            Enter your register email to reset your password.
          </p>
          <form onSubmit={formik.handleSubmit} action="">
            <CustomInput
              type="text"
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
            />
            <div className="error">
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="mt-3 d-flex justify-content-between gap-15 align-items-center">
              <button className="button border-0" type="submit">
                Submit
              </button>
              <NavLink
                style={{ textDecoration: "none" }}
                className="button"
                to="/login"
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
