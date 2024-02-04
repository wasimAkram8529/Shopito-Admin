import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  RESET_PCATEGORY,
  createProductsCategory,
  getProductCategory,
  updateProductsCategory,
} from "../features/pCategory/pCategorySlice";

let pCategorySchema = Yup.object().shape({
  title: Yup.string().required("Category is required"),
});
const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProductId = location.pathname.split("/")[3];
  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getProductCategory(getProductId))
        .then((data) => {
          formik.setValues({ title: data.payload.title });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      dispatch(RESET_PCATEGORY());
    }
    formik.resetForm();
  }, [getProductId]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: pCategorySchema,
    onSubmit: async (values) => {
      if (getProductId !== undefined) {
        const data = { data: values, id: getProductId };
        dispatch(updateProductsCategory(data));
      } else {
        dispatch(createProductsCategory(values));
      }
      formik.resetForm();
      setTimeout(() => {
        dispatch(RESET_PCATEGORY());
        navigate("/admin/Category-list", { replace: true });
      }, 3000);
    },
  });
  const buttonText =
    getProductId !== undefined ? "Update Product" : "Add Product";
  return (
    <div>
      <h3 className="mb-4 title">{getProductId ? "Update" : "Add"} Brand</h3>
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

export default AddCategory;
