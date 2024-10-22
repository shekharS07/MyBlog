import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { User } from "./models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer";
import fs from "fs";
import Post from "./models/post.model.js";
import uploadOnCloudinary from "./utils/cloudinary.js";
import dotenv from "dotenv";

dotenv.config();

const upload = multer({ dest: "uploads/" });
const app = express();

app.use(cors({ credentials: true, origin: "https://myblog-client-shivam.vercel.app" }));
app.use(express.json());
app.use(cookieParser());

const salt = bcrypt.genSaltSync(10);
const secret = "ygf7832ybuywqegfd8732rf7rgf3bfjdd";

await mongoose.connect(process.env.MONGO_PASSWORD);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);

  if (passOk) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", upload.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  console.log("Originalname and path:", originalname, path);

  const result = await uploadOnCloudinary(path);
  console.log("Cloudinary upload result:", result);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: result?.url,
      author: info.id,
    });

    res.json(postDoc);
  });
});

app.put("/post", upload.single("file"), async (req, res) => {
  let result = null;

  if (req.file) {
    const { path } = req.file;
    result = await uploadOnCloudinary(path);
  }
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc=await Post.findById(id);
    const isAuthor=JSON.stringify(postDoc?.author) === JSON.stringify(info.id);
    if(!isAuthor){
      res.json("you are not the author")
    }
    await postDoc.updateOne({
      title,
      summary,
      content,
      cover:result?.url ? result?.url : postDoc.cover
    })
    res.json(postDoc);
  });
});

app.get("/post", async (req, res) => {
  res.json(await Post.find().populate("author", ["username"]));
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

app.listen(4000);
