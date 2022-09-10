import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Alert, Confirm } from "../Alerts/MessageComponents";
import useTitle from "../Hooks/useTitle";
import Loader from "../Loader/Loader";
import { Delete, Get } from "../Services/CRUDServices";

const Post = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [mainPosts, setMainPosts] = useState([]);
  const [uId, setUId] = useState("");
  useTitle("پست ها");

  const handleLoadData = async () => {
    try {
      const result = await Get("posts", null);
      if (result.status === 200) {
        setPosts(result.data);
        setMainPosts(result.data);
      }
    } catch (error) {
      Alert(`Error ${error.request.status}`, "خطا در برقراری ارتباط", "error");
    }
  };
  const handleSearch = () => {
    if (uId > 0) {
      setPosts(mainPosts.filter((p) => p.userId === uId));
    } else {
      setPosts(mainPosts);
    }
  };
  const handleDeletePost = async (postId) => {
    const doDelete = await Confirm(
      "حذف رکورد؟",
      `آیا از حذف رکورد  ${postId} اطمینان دارید؟`,
      "warning"
    );
    if (doDelete) {
      try {
        const result = await Delete("posts", postId);
        if (result.status === 200) {
          const newPosts = posts.filter((p) => p.id !== postId);
          setPosts(newPosts);
          Alert("", `آیتم ${postId} با موفقیت حذف شد`, "success");
        }
      } catch (error) {
        Alert("خطا", "!حذف ناموفق", "error");
      }
    }
  };

  useEffect(() => {
    handleLoadData();
  }, []);
  useEffect(() => {
    handleSearch();
  }, [uId]);

  return (
    <Fragment>
      <h4>مدیریت پست ها</h4>
      <div className="user_container">
        <div className="user_header">
          <input
            type="number"
            placeholder="جستجو بر اساس شناسه کاربر"
            onChange={(e) => {
              setUId(Number(e.target.value.trim()));
            }}
            value={uId}
          />
          <button className="btn_reload" onClick={handleLoadData}>
            <i className="fa-solid fa-arrow-rotate-right"></i>
          </button>
          <Link to={"/post/add"}>
            <button className="btn_add_user">
              <i className="fa-solid fa-user-plus"></i>
            </button>
          </Link>
        </div>
        {posts.length ? (
          <div className="user_body">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>شناسه کاربر</th>
                  <th>موضوع</th>
                  <th>توضیحات</th>
                  <th>عملیات</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td
                      onClick={() => {
                        setUId(u.userId);
                      }}
                    >
                      {u.userId}
                    </td>
                    <td>{u.title}</td>
                    <td>{u.body}</td>
                    <td>
                      <i
                        className="fa-solid fa-pen-to-square"
                        onClick={() => {
                          navigate(`/post/add/${u.id}`);
                        }}
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => {
                          handleDeletePost(u.id);
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
export default Post;
