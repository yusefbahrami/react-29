import React, { useEffect } from "react";
import { useContext } from "react";
import swal from "sweetalert";
import { Route, Routes } from "react-router-dom";
import "./MainStyle.css";
import { MainContext } from "./Context/MainContext";
import Gallery from "./Gallery/Gallery";
import Post from "./Posts/Post";
import Todo from "./Todos/Todo";
import Users from "./Users/Users";
import AddUser from "./Users/AddUser";

const Content = () => {
  const { showMenu, setShowMenu } = useContext(MainContext);

  const handleShowMenu = (event) => {
    event.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setShowMenu(true);
    }
  }, []);

  return (
    <div
      className={`content_section ${showMenu ? "active_sidebar" : ""}`}
      onClick={() => {
        setShowMenu(false);
      }}
    >
      <i
        className={`fa-solid fa-bars ${showMenu ? "active" : ""}`}
        onClick={handleShowMenu}
      ></i>
      <Routes>
        <Route path="/user" element={<Users />} />
        <Route path="/user/add" element={<AddUser />}>
          <Route path=":userId" />
        </Route>
        <Route path="/post" element={<Post />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<Users />} />
      </Routes>
    </div>
  );
};
export default Content;
