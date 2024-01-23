import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { RESET_BRAND, createBrand } from "../features/brand/brandSlice";

let brandSchema = Yup.object().shape({
  title: Yup.string().required("Brand is required"),
});
const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: brandSchema,
    onSubmit: (values) => {
      dispatch(createBrand(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/brand-list", { replace: true });
      }, 3000);
    },
  });
  const { isSuccess, isLoading, isError, brands } = useSelector(
    (state) => state.brand
  );
  useEffect(() => {
    if (isSuccess && brands) {
      toast.success("Brand Added Successfully");
    }
    if (isError) {
      toast.error("Something went wrong");
    }
    dispatch(RESET_BRAND());
  }, [isLoading, isSuccess, isError, brands, dispatch]);
  return (
    <div>
      <h3 className="mb-4 title">Add Brand</h3>
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
            Add Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
