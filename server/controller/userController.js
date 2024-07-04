//db connection
// const e = require("express");
// const { json } = require("stream/consumers");
const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { username, email, firstname, lastname, password } = req.body;

  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required information" });
  }
  try {
    const [user] = await dbConnection.query(
      "select username, userid from users where username = ? or email = ?",
      [username, email]
    );
    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User already registered" });
    }

    if (password.length <= 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Password must be at least 8 characters" });
    }

    // encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await dbConnection.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?,?,?,?,?)",
      [username, firstname, lastname, email, hashedPassword]
    );
    return res.status(StatusCodes.CREATED).json({ msg: "user registered" });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later." });
  }
}

//login

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter all required fields" });
  }

  try {
    const [user] = await dbConnection.query(
      "select username, userid, password from users where email = ?",
      [email]
    );
    if (user.length == 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "You are not registered." });
    }
    //Compare password to hashed password
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid credential" });
    }

    const username = user[0].username;
    const userid = user[0].userid;
    const token = jwt.sign({ username, userid }, process.env.DB_JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(StatusCodes.OK)
      .json({ msg: "User login successful", token, username, userid });

    // return res.json({ user:user[0].password })
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later." });
  }
}

async function checkUser(req, res) {
  const { username, userid } = req.user;

  res.status(StatusCodes.OK).json({ msg: "Valid user", username, userid });
}

module.exports = { register, login, checkUser };
