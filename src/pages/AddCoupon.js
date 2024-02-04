import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  RESET_COUPON,
  createCoupon,
  getACoupon,
  updateCoupon,
} from "../features/coupon/couponSlice";
import { formateDate2 } from "../utils/importantFunctions";

let brandSchema = Yup.object().shape({
  name: Yup.string().required("Coupon title is required"),
  discount: Yup.number().required("Discount is required"),
  expiry: Yup.date().required("Expiry date is required"),
});
const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const getCouponId = location.pathname.split("/")[3];
  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId))
        .then((data) => {
          formik.setValues({
            name: data.payload.name,
            discount: data.payload.discount,
            expiry: formateDate2(data.payload.expiry),
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      dispatch(RESET_COUPON());
    }
    formik.resetForm();
  }, [getCouponId]);

  const formik = useFormik({
    initialValues: {
      name: "",
      discount: "",
      expiry: "",
    },
    validationSchema: brandSchema,
    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data = { data: values, id: getCouponId };
        dispatch(updateCoupon(data));
      } else {
        dispatch(createCoupon(values));
      }
      formik.resetForm();
      setTimeout(() => {
        dispatch(RESET_COUPON());
        navigate("/admin/coupon-list", { replace: true });
      }, 3000);
    },
  });

  const buttonText = getCouponId !== undefined ? "Update Coupon" : "Add Coupon";
  return (
    <div>
      <h3 className="mb-4 title">{getCouponId ? "Update" : "Add"} Coupon</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            placeholder="Enter Coupon Title"
            name="name"
            onCh={formik.handleChange("name")}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
          </div>
          <CustomInput
            type="number"
            placeholder="Enter Discount"
            name="discount"
            onCh={formik.handleChange("discount")}
            val={formik.values.discount}
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount ? (
              <div>{formik.errors.discount}</div>
            ) : null}
          </div>
          <CustomInput
            type="date"
            placeholder="Enter Expiry Date"
            name="expiry"
            onCh={formik.handleChange("expiry")}
            val={formik.values.expiry}
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry ? (
              <div>{formik.errors.expiry}</div>
            ) : null}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
