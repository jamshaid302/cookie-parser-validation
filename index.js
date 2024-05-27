const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { authorization } = require("./middlewares");

app.use(cookieParser());

app.get("/", (req, res) => {
  return res.json({ message: "Hello World 🤘" });
});

app.get("/login", (req, res) => {
  try {
    // const { username, password } = req.body;
    // if (username === "admin" && password === "admin") {
    //   res.cookie("token", "admin", { httpOnly: true });
    //   return res.json({ message: "Login Successful" });
    // }
    // res.status(401).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: 7, role: "admin" }, "secret", {
      expiresIn: "1h",
    });
    res
      .cookie("access_token", token, {
        httpOnly: true,
        // secure: process?.env?.NODE_ENV === "production",
      })
      .status(200)
      .json({ message: "Login Successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/protected", authorization, (req, res) => {
  return res.json({ userId: req.userId, userRole: req.userRole });
});

app.get("/logout", (req, res) => {
  try {
    return res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Successfully logged out 😏 🍀" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
