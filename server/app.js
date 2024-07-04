require("dotenv").config();

const express = require('express');
const app = express();
const port = 5500;

const cors = require('cors');

app.use(cors());

// db Connection
const dbConnection = require("./db/dbConfig");

// User route middleware file
const userRoutes = require("./routes/userRoute");

//Question route
const questionsRoutes = require("./routes/questionRoute");

const answerRoute = require('./routes/answerRoute')

//Auth middleware file
const authMiddleware = require("./middleware/authMiddleware");

// json middleware to extract json data
app.use(express.json());

// User routes middleware
app.use("/api/users",  userRoutes);

// Questions routes middleware
app.use("/api/questions", authMiddleware, questionsRoutes);

app.use("/api/answers", authMiddleware, answerRoute);

// Questions routes middleware
// app.use("/api/answers");

async function start() {
  try {
    const result = await dbConnection.execute("select 'test' ");
    await app.listen(port);
    console.log("database connection established");
    console.log(`listening on ${port}`);
  } catch (error) {
    console.log(error);
  }
}
start();

//******** SERVER SIDE FILTERING */
//  const searchQuery = `%${queryString}%`;
