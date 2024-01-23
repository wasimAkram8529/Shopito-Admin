import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  RESET_PCATEGORY,
  createProductsCategory,
} from "../features/pCategory/pCategorySlice";

console.log("1");
let pCategorySchema = Yup.object().shape({
  title: Yup.string().required("Category is required"),
});
const AddCategory = () => {
  console.log("2");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: pCategorySchema,
    onSubmit: async (values) => {
      console.log("3");
      await dispatch(createProductsCategory(values));
      console.log("4");
      formik.resetForm();
      setTimeout(() => {
        console.log("5");
        navigate("/admin/category-list", { replace: true });
      }, 3000);
    },
  });
  const { isSuccess, isLoading, isError, pCategory } = useSelector(
    (state) => state.pCategory
  );
  useEffect(() => {
    console.log("6");
    if (isSuccess && pCategory) {
      toast.success("Category Added Successfully");
      console.log("7");
    }
    if (isError) {
      toast.error("Something went wrong");
    }
    console.log("8");
    dispatch(RESET_PCATEGORY());
    console.log("9");
  }, [isLoading, isSuccess, isError, pCategory, dispatch]);
  console.log("10");
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
