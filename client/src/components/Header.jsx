import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../store/UserContext";
import { FaBloggerB } from "react-icons/fa";

function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("https://my-blog-api-shivam.vercel.app/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("https://my-blog-api-shivam.vercel.app/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }
  const username = userInfo?.username;
  return (
    <header>
      <Link to="/" className="logo">
        {" "}
        <FaBloggerB />
        MyBlog{" "}
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a className="logout" onClick={logout}>
              Logout ( {username})
            </a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
export default Header;
