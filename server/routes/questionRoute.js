const express = require("express");
const router = express.Router();

//* question controllers
const {
  allquestions,
  askquestions,
  questiondesc,
} = require("../controller/questionController");

//* authentication middleware - home page
router.get("/all-questions", allquestions);

router.post("/askquestions", askquestions);

router.get("/get-questions/:questionid", questiondesc);

module.exports = router;

// router.get("/all-questions", (req, res) => {
//   res.send("All questions");
// });

// module.exports = router;
