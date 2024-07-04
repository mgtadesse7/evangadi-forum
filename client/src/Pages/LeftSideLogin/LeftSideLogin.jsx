import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import LogIn from "../Login/Login";
import Register from "../Register/Register";
import classes from "./leftSideLogin.module.css";

const LeftSideLogin = () => {
  //` State to toggle between login and register
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section className={classes.auth_wrapper}>
      <div className={classes.middle_section_container}>
        <div className={classes.middle_section}>
          <div className={classes.left_side}>
            {isLogin ? (
              <LogIn setIsLogin={setIsLogin} />
            ) : (
              <Register setIsLogin={setIsLogin} />
            )}
          </div>
          <div className={classes.right_side}>
            <div className={classes.right_side_container}>
              <small>About</small>
              <h2>EVANGADI NETWORK</h2>
              <p>
                No matter what stage of life you are in, whether you’re just
                starting elementary school or being promoted to CEO of a Fortune
                500 company, you have much to offer to those who are trying to
                follow in your footsteps.
              </p>
              <p>
                Whether you are willing to share your knowledge or you are just
                looking to meet mentors of your own, please start by joining the
                network here.
              </p>
              <div>
                <button
                  className={classes.create_account}
                  onClick={() => setIsLogin(false)}
                >
                  Create New Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeftSideLogin;
