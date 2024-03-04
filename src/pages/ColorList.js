import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteColor, getColor } from "../features/color/colorSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModel from "../components/CustomModel";
import Loader from "../components/loader/Loader";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Color",
    dataIndex: "color",
    sorter: (a, b) => a.color.length - b.color.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ColorList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");
  const hideModal = () => {
    setOpen(false);
  };
  const showModal = (id) => {
    setOpen(true);
    setColorId(id);
  };

  useEffect(() => {
    dispatch(getColor());
  }, []);

  const { colors, isLoading } = useSelector((state) => state.color);
  //console.log(colors);
  const data1 = [];
  if (!isLoading) {
    for (let i = 0; i < colors?.length; i++) {
      data1.push({
        key: i,
        color: colors?.[i]?.title,
        action: (
          <div className="action-menu">
            <Link className="fs-2" to={`/admin/color/${colors?.[i]?._id}`}>
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-2 text-danger bg-transparent border-0"
              onClick={() => showModal(colors?.[i]?._id)}
            >
              <AiFillDelete />
            </button>
          </div>
        ),
      });
    }
  }

  const deleteColorHandler = async (id) => {
    await dispatch(deleteColor(id));
    hideModal();
    // Refetch the brand list after deletion
    dispatch(getColor());
  };
  return (
    <>
      {isLoading && <Loader />}
      <div>
        <h3 className="mb-4 title">Colors</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModel
          open={open}
          hideModal={hideModal}
          performAction={() => deleteColorHandler(colorId)}
          title="Are you sure want to delete this Color"
        />
      </div>
    </>
  );
};

export default ColorList;
