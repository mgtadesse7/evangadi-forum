import React, { useRef } from "react";
import axios from "../../axios";
import { useNavigate, Link } from "react-router-dom";
import arrow from "../../assets/images/icons8-hand-right-50.png";
import classes from "./postQuestion.module.css";

function Postquestion() {
  const titleDom = useRef();
  const descriptionDom = useRef();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  async function handlePost(e) {
    e.preventDefault();

    const titlevalue = titleDom.current.value;
    const descriptionvalue = descriptionDom.current.value;

    if (!titlevalue || !descriptionvalue) {
      alert("please provide all required information");
      return;
    }
    try {
      await axios.post(
        "/questions/askquestions",
        {
          title: titlevalue,
          description: descriptionvalue,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      alert("Your question is posted");
      navigate("/");
    } catch (error) {
      alert("something went wrong");
      console.log(error);
    }
  }

  return (
    <section className={classes.question_section_container}>
      <div className={classes.question_steps_container}>
        <div className={classes.question_steps}>
          <h3>Steps to write a good question</h3>
          <div className={classes.question_steps_list}>
            <ul>
              <li>Summarize your problem in a one-line title.</li>
              <li>Describe your problem in more detail.</li>
              <li>Describe what you tried and what you expected to happen</li>
              <li>Review your question and post it to the site</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={classes.ask_question_form}>
        <h3>Ask a public question</h3>
        <Link to="/">Go to question page</Link>
        <div className={classes.ask_question_box}>
          <form onSubmit={handlePost}>
            <input ref={titleDom} type="text" placeholder="Question title" />
            <textarea
              ref={descriptionDom}
              type="text"
              placeholder="Detailed question description"
              rows="10"
              cols="10"
              required
            ></textarea>

            <button type="submit">Post Question</button>
          </form>
        </div>
      </div>
      <div className={classes.form}></div>
    </section>
  );
}

export default Postquestion;
