import React from "react";
import CustomInput from "../components/CustomInput";
import { ShowOnLogout } from "../components/hiddenLink/hiddenLink";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { resetPassword } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import resetImg from "../assets/forgot.png";

let resetPasswordSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().required("Confirm Password is required"),
});
const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = location.pathname.split("/")[2];

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
      //console.log(values);
      if (values.password !== values.confirmPassword) {
        toast.error("Password And Confirm Password Should me Matched");
        return;
      }
      delete values.confirmPassword;
      const confidentialData = { token, userData: values };
      dispatch(resetPassword(confidentialData))
        .then((data) => {
          if (data.payload.message === "Password Updated") {
            toast.success("Password Updated");
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      formik.resetForm();
    },
  });
  return (
    <ShowOnLogout>
      <div className="auth-container">
        <div className="auth-img">
          <img src={resetImg} alt="Reset image" />
        </div>
        <div className="auth-card">
          <h3 className="text-center">Reset password</h3>
          <p className="text-center">Please enter your new and password</p>
          <form
            action=""
            onSubmit={formik.handleSubmit}
            className="d-flex flex-column gap-15"
          >
            <CustomInput
              type="text"
              placeholder="Password"
              name="password"
              onCh={formik.handleChange("password")}
              val={formik.values.password}
            />
            <div className="error">
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>
            <CustomInput
              type="text"
              placeholder="Confirm Password"
              name="confirmPassword"
              onCh={formik.handleChange("confirmPassword")}
              val={formik.values.confirmPassword}
            />
            <div className="error">
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div>{formik.errors.confirmPassword}</div>
              ) : null}
            </div>
            <div>
              <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                <button className="button border-0" type="submit">
                  Ok
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ShowOnLogout>
  );
};

export default ResetPassword;
