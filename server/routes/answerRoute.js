const express = require("express");
const router = express.Router();

//* answer controllers
const {
  answeredquestions,
  answerquestions,
} = require("../controller/answerController");
//* authontication middleware - home page
router.get("/getanswer/:questionid", answeredquestions);

router.post("/post-answers/:questionid", answerquestions);

module.exports = router;
