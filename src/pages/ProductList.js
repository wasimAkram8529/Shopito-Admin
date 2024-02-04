import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import CustomModel from "../components/CustomModel";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price.length - b.price.length,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ProductList = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");

  const hideModal = () => {
    setOpen(false);
  };
  const showModal = (id) => {
    setOpen(true);
    setProductId(id);
  };
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const { products, isLoading } = useSelector((state) => state.product);

  const data1 = [];
  if (!isLoading) {
    for (let i = 0; i < products.length; i++) {
      data1.push({
        key: i,
        title: products[i].title,
        price: products[i].price,
        category: products[i].category,
        brand: products[i].brand,
        action: (
          <div className="action-menu">
            <Link className="fs-2" to={`/admin/product/${products[i]._id}`}>
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-2 text-danger bg-transparent border-0"
              onClick={() => showModal(products[i]._id)}
            >
              <AiFillDelete />
            </button>
          </div>
        ),
        quantity: products[i].quantity >= 0 ? products[i].quantity : 0,
      });
    }
  }

  const deleteProductHandler = async (id) => {
    await dispatch(deleteProduct(id));
    hideModal();
    // Refetch the brand list after deletion
    dispatch(getProducts());
  };
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel
        open={open}
        hideModal={hideModal}
        performAction={() => deleteProductHandler(productId)}
        title="Are you sure want to delete this product"
      />
    </div>
  );
};

export default ProductList;
