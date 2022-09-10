import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { Alert, Confirm } from "../Alerts/MessageComponents";
import { Delete, Get } from "../Services/CRUDServices";
import useTitle from "../Hooks/useTitle";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [mainUsers, setMainUsers] = useState([]);
  const navigate = useNavigate();
  useTitle("کاربران");

  const handleLoadData = async () => {
    try {
      const result = await Get("users", null);
      if (result.status === 200) {
        setUsers(result.data);
        setMainUsers(result.data);
      }
    } catch (error) {
      Alert(`Error ${error.request.status}`, "خطا در برقراری ارتباط", "error");
    }
  };

  const handleDeleteUser = async (itemId) => {
    const doDelete = await Confirm(
      "حذف رکورد؟",
      `آیا از حذف رکورد  ${itemId} اطمینان دارید؟`,
      "warning"
    );

    if (doDelete) {
      try {
        const result = await Delete("users", itemId);
        if (result.status === 200) {
          const newUsers = users.filter((u) => u.id !== itemId);
          setUsers(newUsers);
          Alert("", `آیتم ${itemId} با موفقیت حذف شد`, "success");
        }
      } catch (error) {
        Alert("خطا", "!حذف ناموفق", "error");
      }
    }
  };

  const handleSearch = (e) => {
    setUsers(
      mainUsers.filter((u) =>
        u.name.toLowerCase().includes(e.target.value.trim().toLowerCase())
      )
    );
  };

  useEffect(() => {
    handleLoadData();
  }, []);

  return (
    <Fragment>
      <h4>مدیریت کاربران</h4>
      <div className="user_container">
        <div className="user_header">
          <input
            type="text"
            placeholder="جستجو بر اساس نام"
            onChange={handleSearch}
          />
          <button className="btn_reload" onClick={handleLoadData}>
            <i className="fa-solid fa-arrow-rotate-right"></i>
          </button>
          <Link to={"/user/add"}>
            <button className="btn_add_user">
              <i className="fa-solid fa-user-plus"></i>
            </button>
          </Link>
        </div>
        {users.length ? (
          <div className="user_body">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>نام</th>
                  <th>نما کاربری</th>
                  <th>ایمیل</th>
                  <th>عملیات</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>
                      <i
                        className="fa-solid fa-pen-to-square"
                        onClick={() => {
                          navigate(`/user/add/${u.id}`);
                        }}
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => {
                          handleDeleteUser(u.id);
                        }}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </Fragment>
  );
};
export default Users;
