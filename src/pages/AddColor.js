import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  RESET_COLOR,
  createColor,
  getAColor,
  updateColor,
} from "../features/color/colorSlice";

let colorSchema = Yup.object().shape({
  title: Yup.string().required("Color is required"),
});
const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getColorId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getAColor(getColorId))
        .then((data) => {
          formik.setValues({ title: data.payload.title });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      dispatch(RESET_COLOR());
    }
    formik.resetForm();
  }, [getColorId]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: colorSchema,
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        const data = { data: values, id: getColorId };
        dispatch(updateColor(data));
      } else {
        dispatch(createColor(values));
      }
      formik.resetForm();
      setTimeout(() => {
        RESET_COLOR();
        navigate("/admin/color-list", { replace: true });
      }, 3000);
    },
  });

  const buttonText = getColorId !== undefined ? "Update Color" : "Add Color";
  return (
    <div>
      <h3 className="mb-4 title">{getColorId ? "Update" : "Add"} Color</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            placeholder="Enter New Color"
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

export default AddColor;
