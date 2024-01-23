import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { RESET_COLOR, createColor } from "../features/color/colorSlice";

let colorSchema = Yup.object().shape({
  title: Yup.string().required("Color is required"),
});
const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: colorSchema,
    onSubmit: (values) => {
      //dispatch(createColor(values));
      console.log(values);
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/color-list", { replace: true });
      }, 3000);
    },
  });
  const { isSuccess, isLoading, isError, color } = useSelector(
    (state) => state.color
  );
  useEffect(() => {
    if (isSuccess && color) {
      toast.success("Color Added Successfully");
    }
    if (isError) {
      toast.error("Something went wrong");
    }
    dispatch(RESET_COLOR());
  }, [isLoading, isSuccess, isError, color, dispatch]);
  return (
    <div>
      <h3 className="mb-4 title">Add Color</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            placeholder="Enter Color Catgory"
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
            Add Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
