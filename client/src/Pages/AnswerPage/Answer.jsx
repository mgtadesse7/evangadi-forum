import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../axios";
import classes from "./answer.module.css"

function QuestionDetailAndAnswers() {
  const answerDom = useRef();
  const { questionid } = useParams();
  // const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState([]);

  // useEffect(() => {

  //       axios.get(
  //         `/questions/get-questions/${questionid}`,
  //         {
  //           headers: {
  //             Authorization: "Bearer " + token,
  //           },
  //         }
  //       )
  //       .then((res) => {
  //       setValues(res.data);
  //       console.log(res.data);
  //     })
  //      .catch ((err) => {
  //       console.log(err);})

  //   }, []);
  useEffect(() => {
    async function QuestionDetails() {
      try {
        const response = await axios.get(
          `/questions/get-questions/${questionid}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setValues(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error with question details:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
        }
      }
    }
    QuestionDetails();
  }, [questionid]);

  // To get all answers

  async function getAllAnswer() {
    try {
      const respond = await axios.get(`/answers/getanswer/${questionid}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setAnswers(respond.data);
      console.log(respond.data);
    } catch (error) {
      console.error("Error with question details:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    }
  }
  useEffect(() => {
    getAllAnswer();
  }, [isLoading]);

  // useEffect(() => {
  //    axios.get(
  //           `/answers/getanswer/${questionid}`,
  //           {
  //             headers: {
  //               Authorization: "Bearer " + token,
  //             },
  //           }
  //         )
  //         .then((res) => {
  //         setAnswers(res.data);
  //         console.log(res.data)})

  //       .catch ((err) => {
  //         console.log(err)})
  // },[])

  // const handleAnswer = async (e) => {
  //   e.preventDefault();
  //   const answervalue = answerDom.current.value;
  //   setIsLoading(true);

  //   try {
  //     await axios.post(
  //       `/answers/post-answers/${questionid}`,
  //       {
  //         answer: answervalue,
  //         questionid: questionid
  //       },
  //       {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     );
  //     alert("answer is posted");
  //     setIsLoading(false);
  //     answerDom.current.value = "";
  //   } catch (error) {
  //     alert("something went wrong");
  //     console.log(error);
  //     setIsLoading(false);
  //   }
  // };

  async function handleSubmit() {
    //  e.preventDefault();
    const answervalue = answerDom.current.value;
    console.log("Question ID:", questionid);
    if (!answervalue) {
      //  alert("before you post you have to answer for the given question");
      return;
    }
    try {
      await axios.post(
        `/answers/post-answers/${questionid}`,
        {
          answer: answervalue,
          //  questionid: questionid
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      alert("something went wrong");
      console.log(error);

      setIsLoading(false);
    }
  }
  useEffect(() => {
    handleSubmit();
  }, []);
  return (
    <section className={classes.question_answer_page_container}>
      <h4>Questions</h4>
      <div>
        {values?.map((question) => (
          <div className={classes.question_title} key={question.id}>
            <h4>{question.title}</h4>
            <p>{question.description}</p>
          </div>
        ))}
      </div>
      <div>
        <hr />
        <div className={classes.answer_community}>
          <h3>Answer from the community</h3>
          </div>
          <hr />
          <div>
            {answers?.map((answer, i) => (
            <div className={classes.answer_item} key={i}>
              <div className={classes.icon_username_container}>
                <span className={classes.question_username}>{answer.username}</span>
              </div>
              <div className={classes.answer_text}>
                <h4>{answer.answer}</h4>
              </div>
            </div>
          ))}
          </div>
      </div>

      <div className={classes.answer_form}>
        <h3>Answer The Top Question</h3>
        <Link to="/home">Go to question page</Link>
        <div className={classes.ask_question_box}>
          <form onSubmit={handleSubmit}>
            <textarea
              ref={answerDom}
              type="text"
              placeholder="Your answer"
              required
            />
            <button className={classes.answer_button} type="submit">Post Answer</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default QuestionDetailAndAnswers;
