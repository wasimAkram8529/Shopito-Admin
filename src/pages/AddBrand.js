import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  RESET_BRAND,
  createBrand,
  getBrand,
  updateBrand,
} from "../features/brand/brandSlice";

let brandSchema = Yup.object().shape({
  title: Yup.string().required("Brand is required"),
});
const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBrandId = location.pathname.split("/")[4];

  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getBrand(getBrandId))
        .then((data) => {
          formik.setValues({ title: data.payload.title });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      dispatch(RESET_BRAND());
    }
    formik.resetForm();
  }, [getBrandId]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: brandSchema,
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const data = { data: values, id: getBrandId };
        dispatch(updateBrand(data));
      } else {
        dispatch(createBrand(values));
      }
      formik.resetForm();
      setTimeout(() => {
        dispatch(RESET_BRAND());
        navigate("/admin/brand-list", { replace: true });
      }, 3000);
    },
  });
  const buttonText = getBrandId !== undefined ? "Update Brand" : "Add Brand";
  return (
    <div>
      <h3 className="mb-4 title">{getBrandId ? "Update" : "Add"} Brand</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            placeholder="Enter New Brand"
            name="title"
            onCh={formik.handleChange("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title}</div>
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

export default AddBrand;
