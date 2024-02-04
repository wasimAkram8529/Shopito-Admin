import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createBlogCategory,
  RESET_BLOG_CATEGORY,
  getABlogCategory,
  updateBlogCategory,
} from "../features/bCategory/bCategorySlice";

let blogSchema = Yup.object().shape({
  title: Yup.string().required("Category is required"),
});
const AddBlogCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlogCategory(getBlogId))
        .then((data) => {
          formik.setValues({ title: data.payload.title });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      dispatch(RESET_BLOG_CATEGORY());
    }
    formik.resetForm();
  }, [getBlogId]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: blogSchema,
    onSubmit: async (values) => {
      if (getBlogId !== undefined) {
        const data = { data: values, id: getBlogId };
        dispatch(updateBlogCategory(data));
      } else {
        dispatch(createBlogCategory(values));
      }
      formik.resetForm();
      setTimeout(() => {
        dispatch(RESET_BLOG_CATEGORY());
        navigate("/admin/blog-category-list", { replace: true });
      }, 3000);
    },
  });

  const buttonText =
    getBlogId !== undefined ? "Update Blog Category" : "Add Blog Category";
  return (
    <div>
      <h3 className="mb-4 title">
        {getBlogId ? "Update" : "Add"} Blog Category
      </h3>
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
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCat;
