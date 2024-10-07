import "./ViewOrder.css";
import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getAOrder } from "../../features/auth/authSlice";
import CartComponent from "../../components/cartComponent/CartComponent";
import Loader from "../../components/loader/Loader";

const ViewOrder = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getOrderId = location.pathname.split("/")[3];

  useEffect(() => {
    dispatch(getAOrder(getOrderId));
  }, [getOrderId]);

  const { userOrders, isLoading } = useSelector((state) => state.auth);
  return (
    <>
      {isLoading && <Loader />}
      <div className="cart-main">
        <div className="page-title">View Order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {userOrders?.length !== 0 &&
              userOrders?.[0]?.orderItems?.map((product) => {
                return (
                  <div key={product?._id}>
                    <CartComponent
                      title={product?.product?.title}
                      shippingDateString={userOrders?.[0]?.deliveryDate}
                      price={product?.price}
                      quantity={product?.quantity}
                      imageURL={product?.product?.image?.[0]?.url}
                      color={product?.color?.title}
                      brand={product?.product?.brand}
                      status={userOrders?.[0]?.orderStatus}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewOrder;
