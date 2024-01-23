import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getbrands } from "../features/brand/brandSlice";
import { getProductsCategory } from "../features/pCategory/pCategorySlice";
import { getColor } from "../features/color/colorSlice";
import "react-widgets/styles.css";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import {
  uploadProductImg,
  deleteProductImg,
} from "../features/upload/uploadSlice";
import { RESET_AUTH, createProduct } from "../features/product/productSlice";
import { toast } from "react-toastify";

// Validation of New Product
let productSchema = Yup.object().shape({
  title: Yup.string().required("Product title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
  color: Yup.array()
    .min(1, "Pick at least one color")
    .required("Product Color is required"),
  category: Yup.string().required("Product Category is required"),
  tags: Yup.string().required("Product Tag is required"),
  brand: Yup.string().required("Product Brand is required"),
  quantity: Yup.number().required("Product Quantity is required"),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const [color, setColor] = useState();
  const navigate = useNavigate();
  //const [imageList, setImageList] = useState();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      color: "",
      brand: "",
      category: "",
      quantity: "",
      image: "",
      tags: "",
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      dispatch(createProduct(values));
      formik.resetForm();
      setColor(null);
      dispatch(RESET_AUTH());
      setTimeout(() => {
        navigate("/admin/product-list");
      }, 3000);
    },
  });
  // Dispatch to get Details
  useEffect(() => {
    dispatch(getbrands());
    dispatch(getProductsCategory());
    dispatch(getColor());
  }, [dispatch]);

  // Get States
  const { brands, isLoading } = useSelector((state) => state.brand);
  const { pCategory } = useSelector((state) => state.pCategory);
  const { colors } = useSelector((state) => state.color);
  const { images } = useSelector((state) => state.upload);
  const productCreated = useSelector((state) => state.product);

  useEffect(() => {
    if (productCreated.isSuccess && productCreated.products) {
      toast.success("Product Added Successfully");
    }

    if (productCreated.isError) {
      toast.error("Something went wrong");
    }
  }, [
    productCreated.isLoading,
    productCreated.isSuccess,
    productCreated.isError,
    productCreated.products,
  ]);

  // Lists
  let brandList = [];
  let pCategoryList = [];
  let colorList = [];

  if (!isLoading) {
    brandList = brands.map((item, j) => {
      return (
        <option key={j + 1} value={item.title}>
          {item.title}
        </option>
      );
    });
    pCategoryList = pCategory.map((item, j) => {
      return (
        <option key={j + 1} value={item.title}>
          {item.title}
        </option>
      );
    });
    colorList = colors.map((item) => {
      return { label: item.title, value: item._id };
    });
  }
  formik.values.color = color ? color : "";
  formik.values.image = images;
  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            placeholder="Enter Product Title"
            Name="title"
            onCh={formik.handleChange("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <CustomInput
              name="description"
              placeholder="Enter Product Description"
              val={formik.values.description}
              onCh={formik.handleChange("description")}
              onBlur={formik.handleBlur("description")}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description ? (
              <div>{formik.errors.description}</div>
            ) : null}
          </div>
          <CustomInput
            type="number"
            placeholder="Enter Product Price"
            name="price"
            onCh={formik.handleChange("price")}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price ? (
              <div>{formik.errors.price}</div>
            ) : null}
          </div>
          <select
            className="form-control py-3 mb-3 mt-3"
            name="brand"
            onChange={formik.handleChange("brand")}
            value={formik.values.brand}
            id="brand"
          >
            <option value="">Select Brand</option>
            {brandList}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand ? (
              <div>{formik.errors.brand}</div>
            ) : null}
          </div>
          <select
            className="form-control py-3"
            name="category"
            onChange={formik.handleChange("category")}
            value={formik.values.category}
            id="category"
          >
            <option value="">Select Category</option>
            {pCategoryList}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category ? (
              <div>{formik.errors.category}</div>
            ) : null}
          </div>
          <select
            className="form-control py-3 mt-3 mb-3"
            name="tags"
            onChange={formik.handleChange("tags")}
            value={formik.values.tags}
            id="tags"
          >
            <option value="" disabled>
              Select tags
            </option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags ? (
              <div>{formik.errors.tags}</div>
            ) : null}
          </div>
          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select Colors"
            defaultValue={color}
            onChange={(i) => setColor(i)}
            options={colorList}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color ? (
              <div>{formik.errors.color}</div>
            ) : null}
          </div>
          <CustomInput
            type="number"
            placeholder="Enter Product Quantity"
            name="quantity"
            onCh={formik.handleChange("quantity")}
            val={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity ? (
              <div>{formik.errors.quantity}</div>
            ) : null}
          </div>
          <div className="bg-white text-center border-1 p-5 mt-3">
            <Dropzone
              onDrop={(acceptedFiles) =>
                dispatch(uploadProductImg(acceptedFiles))
              }
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
            {images.map((image, j) => {
              return (
                <div key={j + 1} className="position-relative">
                  <button
                    type="button"
                    onClick={() => dispatch(deleteProductImg(image.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img
                    src={image.url}
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
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

/*            <ReactQuill
              theme="snow"
              id="description"
              key={formik.values.description}
              value={formik.values.description}
              onChange={formik.handleChange("description")}
              onBlur={formik.handleBlur("description")}
            /> */
