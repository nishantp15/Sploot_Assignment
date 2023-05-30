const express = require("express");
const { signup, login, updateUser } = require("../controllers/userControllers");
const auth = require("../middleware/auth");
const userRouter = express.Router();

// user signup

userRouter.post("/signup", async (req, res) => {
  const body = req.body;

  try {
    const user = await signup(body);

    return res.status(200).send({
        statusCode: 200,
        data: {
          data: user,
        },
        error: "NA",
        message: "NA",
      });
  } catch (err) {
    if (err.message == "User already exists with the given email") {
      return res.status(400).send({
        error: err.message,
      });
    } else {
      console.log(err)
      return res.status(500).send({
        statusCode: 500,
        data: {
          data: {},
        },
        error: err.message,
        message: "Something went wrong",
      });
    }
  }
});

// user login

userRouter.post("/login", async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
    const token = await login(body);

    return res.send({
        statusCode: 200,
        data: {
          data: token,
        },
        error: "NA",
        message: "NA",
      });
  } catch (err) {
    if (
      err.message == "User does not exist with the given email" ||
      err.message == "The password is incorrect"
    ) {
      return res.status(400).send({
        error: err.message,
      });
    } else {
      return res.status(500).send({
        statusCode: 500,
        data: {
          data: {},
        },
        error: err.message,
        message: "Something went wrong",
      });
    }
  }
});

// Get loggedIn user detail

userRouter.get("/loggedin", auth, async (req, res) => {
  try {
    let user = req.user;
    return res.send({
      statusCode: 200,
      data: {
        data: user,
      },
      error: "NA",
      message: "NA",
    });
  } catch (err) {
    res.status(500).send({
      statusCode: 500,
      data: {
        data: {},
      },
      error: err.message,
      message: "Something went wrong",
    });
  }
});

// Update user details

userRouter.patch("/users/:userId", auth, async (req, res) => {
  const id = req.params.userId;
  const userData = req.body;
  let updatedUserData = null;
  try {
    updatedUserData = await updateUser(id, userData.name, userData.age);
    return res.send({
      statusCode: 200,
      data: {
        data: updatedUserData,
      },
      error: "NA",
      message: "NA",
    });
  } catch (err) {
    return res.status(500).send({
      statusCode: 500,
      data: {
        data: {},
      },
      error: err.message,
      message: "Something went wrong",
    });
  }
});

module.exports = userRouter;
