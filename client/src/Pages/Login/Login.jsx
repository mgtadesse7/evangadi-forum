import React, { useRef, useState } from "react";
import axios from "../../axios";
import { Link, useNavigate } from "react-router-dom";
import classes from "./login.module.css";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login({ setIsLogin }) {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (!emailValue || !passwordValue) {
      alert("Please provide all required information");
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });
      alert("Login successful");
      localStorage.setItem("token", data.token);
      navigate("/home");
      setIsLoading(false);
      console.log(data);
      localStorage.setItem("token", data.token);
    } catch (error) {
      alert(error?.response?.data?.msg);
      //  console.log(error.response.data);
      setIsLoading(false);
    }
  }

  return (
    <section className={classes.login_section}>
      <section className={classes.login}>
        <div className={classes.login_container}>
          <h3>Login to your account</h3>
          <p>
            Don't have an account?
            <Link onClick={() => setIsLogin(false)}>Create a new account</Link>
          </p>
        </div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.form_group}>
            <input
              ref={emailDom}
              type="email"
              id="Email"
              placeholder="Email"
              className={classes.full_width}
            />
          </div>
          <div className={classes.form_group}>
            <div className={classes.password_container}></div>
            <input
              className={classes.password_input}
              ref={passwordDom}
              type="password"
              placeholder="Password"
            />
          </div>
          <br />
          <div className={classes.button_wrapper}>
            <button className={classes.button} type="submit">
              Login
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}

export default Login;
