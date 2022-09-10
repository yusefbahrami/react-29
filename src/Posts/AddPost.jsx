import React, { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router";
import { Alert } from "../Alerts/MessageComponents";
import { Get } from "../Services/CRUDServices";
import {
  setDataService,
  updateDataService,
} from "../Services/Set-UpdateServices";
import { init, reducer } from "./PostReducer";

const AddPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [data, dispatch] = useReducer(reducer, init);

  const handleBackPage = () => {
    navigate(-1);
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    if (!postId) {
      setDataService("posts", data.postData);
    } else {
      updateDataService("posts", data.postData, postId);
    }
    handleBackPage();
  };

  const handleLoadUsers = async () => {
    try {
      const result = await Get("users", null);
      if (result.status === 200) {
        dispatch({
          type: "changeUser",
          payload: result.data,
        });
      } else {
        Alert("خطا", "", "error");
      }
    } catch (error) {
      Alert("خطا", `Error ${error.request.status}`, "error");
    }
  };
  const handleLoadPost = async () => {
    try {
      const result = await Get("posts", postId);
      if (result.status === 200) {
        dispatch({ type: "isUpdate", payload: result.data });
      } else {
        Alert("خطا", "", "error");
      }
    } catch (error) {
      Alert("خطا", `Error ${error.request.status}`, "error");
    }
  };
  const setInputValue = (e, propName) => {
    dispatch({
      type: "setInputValue",
      propName: propName,
      propValue: e.target.value.trim(),
    });
  };

  useEffect(() => {
    handleLoadUsers();

    if (postId) {
      handleLoadPost();
    }
  }, []);

  return (
    <div className="content_section">
      <h4>{postId ? "ویرایش پست" : "افزودن پست"}</h4>
      <div className="post_info_get_box">
        <div className="post_get_data">
          <select
            placeholder="انتخاب کاربر"
            value={data.postData.userId}
            onChange={(e) => setInputValue(e, "userId")}
          >
            <option value={null}>انتخاب کاربر</option>
            {data.users.map((u) => (
              <option value={u.id} key={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="شناسه کاربری"
            value={data.postData.userId}
            onChange={(e) => setInputValue(e, "userId")}
          />
          <input
            placeholder="موضوع"
            value={data.postData.title}
            onChange={(e) => setInputValue(e, "title")}
          />
          <textarea
            placeholder="متن"
            value={data.postData.body}
            onChange={(e) => setInputValue(e, "body")}
          >
            test
          </textarea>
        </div>
        <div className="btn_addUser_box">
          <button type="button" className="btn_back" onClick={handleBackPage}>
            بازگشت
          </button>
          <button type="button" className="btn_submit" onClick={handleAddPost}>
            {postId ? "ویرایش" : "ذخیره"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddPost;
