import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Alert } from "../Alerts/MessageComponents";
import useTitle from "../Hooks/useTitle";
import { Get } from "../Services/CRUDServices";
import {
  setDataService,
  updateDataService,
} from "../Services/Set-UpdateServices";

const AddUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
    },
  });
  useTitle(`${userId ? "ویرایش کاربر" : "افزودن کاربر"}`);

  const handleLoadData = async () => {
    try {
      const result = await Get("users", userId);
      if (result.status === 200) {
        setData(result.data);
      }
    } catch (error) {
      Alert(`Error ${error.request.status}`, "خطا در برقراری ارتباط", "error");
    }
  };

  useEffect(() => {
    if (userId) {
      handleLoadData();
    }
  }, []);

  const handleAddUser = () => {
    if (!userId) {
      setDataService("users", data);
    } else {
      updateDataService("users", data, userId);
    }
    handleBackPage();
  };

  const handleBackPage = () => {
    navigate(-1);
  };

  return (
    <div className="content_section">
      <h4>{userId ? "ویرایش کاربر" : "افزودن کاربر"}</h4>
      <div className="user_info_get_box">
        <div className="user_get_names">
          <input
            placeholder="نام"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value.trim() })}
          />
          <input
            placeholder="نام کاربری"
            value={data.username}
            onChange={(e) =>
              setData({ ...data, username: e.target.value.trim() })
            }
          />
          <input
            placeholder="ایمیل"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value.trim() })}
          />
        </div>
        <div className="user_get_address">
          <input
            placeholder="شهر"
            value={data.address.city}
            onChange={(e) =>
              setData({
                ...data,
                address: { ...data.address, city: e.target.value.trim() },
              })
            }
          />
          <input
            placeholder="خیابان"
            value={data.address.street}
            onChange={(e) =>
              setData({
                ...data,
                address: { ...data.address, street: e.target.value.trim() },
              })
            }
          />
          <input
            placeholder="ادامه آدرس"
            value={data.address.suite}
            onChange={(e) =>
              setData({
                ...data,
                address: { ...data.address, suite: e.target.value.trim() },
              })
            }
          />
          <input
            placeholder="کد پستی"
            value={data.address.zipcode}
            onChange={(e) =>
              setData({
                ...data,
                address: { ...data.address, zipcode: e.target.value.trim() },
              })
            }
          />
        </div>
        <div className="btn_addUser_box">
          <button type="button" className="btn_back" onClick={handleBackPage}>
            بازگشت
          </button>
          <button type="button" className="btn_submit" onClick={handleAddUser}>
            {userId ? "ویرایش" : "ذخیره"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddUser;
