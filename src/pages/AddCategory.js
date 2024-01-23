import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  RESET_PCategory,
  createProductsCategory,
} from "../features/pCategory/pCategorySlice";

let pCategorySchema = Yup.object().shape({
  title: Yup.string().required("Category is required"),
});
const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: pCategorySchema,
    onSubmit: (values) => {
      dispatch(createProductsCategory(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/category-list", { replace: true });
      }, 3000);
    },
  });
  const { isSuccess, isLoading, isError, pCategory } = useSelector(
    (state) => state.pCategory
  );
  useEffect(() => {
    if (isSuccess && pCategory) {
      toast.success("Brand Added Successfully");
    }
    if (isError) {
      toast.error("Something went wrong");
    }
    dispatch(RESET_PCategory());
  }, [isLoading, isSuccess, isError, pCategory, dispatch]);
  return (
    <div>
      <h3 className="mb-4 title">Add Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            placeholder="Enter New Catgory"
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
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
