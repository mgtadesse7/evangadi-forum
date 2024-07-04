import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./header.module.css";
import Logo from "../../assets/images/10002.png";
import { AppState } from "../../App";

function Header() {
  const { user, setUser } = useContext(AppState);
  const [authenticate, setAuthenticate] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  
  // const logout = () => {
  //   localStorage.removeItem("token");
  //   setAuthenticate(false);

  //   navigate("/");
  //   window.location.reload();
  // };
const logout = () => {
  if (user) {
    localStorage.removeItem("token");
    setUser(null);
    // setIsLoading(false);
    setTimeout(() => {
      navigate("/login");
      window.location.reload();
      setProcess(false);
    }, 500);
    // navigate("/login");
  } 
};
  

  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header}>
          <div className={classes.header_logo}>
            <Link to="/home">
              <img src={Logo} alt="Evangadi logo" />
            </Link>
          </div>

          <div className={classes.right}>
            <Link>Home</Link>
            <Link to="/">How it Works</Link>

            <div className={classes.button}>
              <button type="button" onClick={logout}>
                {user ? "Log out" : "Log in" }
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Header;
