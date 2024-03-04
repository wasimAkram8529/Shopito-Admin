import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import {
  uploadProductImg,
  deleteProductImg,
} from "../features/upload/uploadSlice";
import {
  RESET_BLOG,
  createBlog,
  getABlog,
  updateBlog,
} from "../features/blogs/blogSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { getBlogCategory } from "../features/bCategory/bCategorySlice";

let blogSchema = Yup.object().shape({
  title: Yup.string().required("Blog title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Blog Category is required"),
});
const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [imageURL, setImageURL] = useState([]);
  const getBlogId = location.pathname.split("/")[3];
  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlog(getBlogId))
        .then((data) => {
          setImageURL(data?.payload?.image);
          formik.setValues({
            title: data?.payload?.title,
            description: data?.payload?.description,
            category: data?.payload?.category,
            image: data?.payload?.image[0],
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      dispatch(RESET_BLOG());
    }
  }, [getBlogId]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: "",
      category: "",
    },
    validationSchema: blogSchema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { data: values, id: getBlogId };
        dispatch(updateBlog(data));
      } else {
        dispatch(createBlog(values));
      }
      formik.resetForm();
      dispatch(RESET_BLOG());
      setTimeout(() => {
        navigate("/admin/blog-list");
      }, 3000);
    },
  });
  // Dispatch to get Details
  useEffect(() => {
    formik.resetForm();
    setImageURL([]);
    dispatch(getBlogCategory());
  }, [getBlogId]);

  const { bCategory, isLoading } = useSelector((state) => state.bCategory);
  const { images } = useSelector((state) => state.upload);

  let bCategoryList = [];
  if (!isLoading) {
    bCategoryList = bCategory?.map((item, j) => {
      return (
        <option key={j + 1} value={item?.title}>
          {item?.title}
        </option>
      );
    });
  }
  formik.values.image = images?.length !== 0 ? images : imageURL;
  const buttonText = getBlogId !== undefined ? "Update Blog" : "Add Blog";

  async function dispatchOnDelete(id) {
    await dispatch(deleteProductImg(id));

    setImageURL([]);
  }
  async function dispatchOnUpload(acceptedFiles) {
    await dispatch(uploadProductImg(acceptedFiles));
    setImageURL([]);
  }

  return (
    <div>
      <h3 className="mb-4 title">
        {getBlogId ? "Update" : "Add"} Blog Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <CustomInput
              type="text"
              placeholder="Enter Blog Title"
              Name="title"
              onCh={formik.handleChange("title")}
              val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title ? (
                <div>{formik.errors.title}</div>
              ) : null}
            </div>
          </div>
          <CustomInput
            name="description"
            placeholder="Enter Product Description"
            val={formik.values.description}
            onCh={formik.handleChange("description")}
            onBlur={formik.handleBlur("description")}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description ? (
              <div>{formik.errors.description}</div>
            ) : null}
          </div>
          <select
            className="form-control py-3 mt-3"
            name="category"
            onChange={formik.handleChange("category")}
            value={formik.values.category}
            id="category"
          >
            <option value="" disabled>
              Select Category
            </option>
            {bCategoryList}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category ? (
              <div>{formik.errors.category}</div>
            ) : null}
          </div>
          <div className="bg-white text-center border-1 p-5 mt-3">
            <Dropzone
              onDrop={(acceptedFiles) => dispatchOnUpload(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="error">
            {formik.touched.image && formik.errors.image ? (
              <div>{formik.errors.image}</div>
            ) : null}
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {images?.length !== 0
              ? images?.map((image, j) => {
                  return (
                    <div key={j + 1} className="position-relative">
                      <button
                        type="button"
                        onClick={() => dispatchOnDelete(image?.public_id)}
                        className="btn-close position-absolute"
                        style={{ top: "10px", right: "10px" }}
                      ></button>
                      <img
                        src={image?.url}
                        alt="ProductImage"
                        width={200}
                        height={200}
                      />
                    </div>
                  );
                })
              : imageURL?.map((image, j) => {
                  return (
                    <div key={j + 1} className="position-relative">
                      <button
                        type="button"
                        onClick={() => dispatchOnDelete(image?.public_id)}
                        className="btn-close position-absolute"
                        style={{ top: "10px", right: "10px" }}
                      ></button>
                      <img
                        src={image?.url}
                        alt="ProductImage"
                        width={200}
                        height={200}
                      />
                    </div>
                  );
                })}
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

export default AddBlog;
