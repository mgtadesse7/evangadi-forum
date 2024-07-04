import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios";
import classes from "./register.module.css";

function Register() {
  const navigate = useNavigate();
  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = usernameDom.current.value;
    const firstValue = firstnameDom.current.value;
    const lastValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    if (
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailValue ||
      !passwordValue
    ) {
      alert("Please provide all required information");
      return;
    }
    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passwordValue,
      });
      alert("Register successful. Please login.");
      navigate("/login");
    } catch (error) {
      alert("Something went wrong.");
      console.log(error.response?.data?.msg);
    }
  }

  return (
    <section>
      <div className={classes.register_container}>
        <div className={classes.form_text}>
          <h3>Join the network</h3>
          <p>
            <Link to={"/login"}>Already have an account?</Link>
          </p>
        </div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.form_group}>
            <input
              className={classes.full_width}
              ref={usernameDom}
              type="text"
              placeholder="Username"
            />
          </div>
          <div className={`${classes.form_group} ${classes.name_fields}`}>
            <input
              className={classes.half_width}
              ref={firstnameDom}
              type="text"
              placeholder="First name"
            />
            <input
              className={classes.half_width}
              ref={lastnameDom}
              type="text"
              placeholder="Last name"
            />
          </div>
          <div className={classes.form_group}>
            <input
              className={classes.full_width}
              ref={emailDom}
              type="email"
              placeholder="Email"
            />
          </div>
          <div className={classes.form_group}>
            <div className={classes.password_container}>
              <input
                className={classes.password_input}
                ref={passwordDom}
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
          <button className={classes.full_width} type="submit">
            Agree and Join
          </button>
        </form>
        <div className={classes.termPrivacy_container}>
          <p>
            I agree to the <Link>privacy policy</Link> and{" "}
            <Link>terms of service</Link>
          </p>
        </div>
        <Link onClick={() => setIsLogin(true)}>Already have an account?</Link>
      </div>
    </section>
  );
}

export default Register;
