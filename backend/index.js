import express from "express";
import { mongoDBURL, PORT } from "./server.js";
import mongoose from "mongoose";
import { Book } from "./model/book.model.js";
import booksRoute from "./router/booksRoute.js";
import cors from "cors";
import router from "./router/booksRoute.js";

const app = express();  
const DB = process.env.DBURL || mongoDBURL;

//it allows us use json in our express backend. // app.use allows us use middlewares more often.
// middleware for parsing in request body
app.use(express.json());

// CORS -> Cross-Origin Resource Sharing
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!Book) {
      return res.status(404).send({ message: "Book not found!" });
    }
    console.log(book);
    return res.status(200).send({
      count: 1,
      data: book,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to MERN Stack Tutorial");
  // return res.status(200).send(router);
});

app.use("/books", booksRoute);

//Connect my MongoDB database to my VS code
mongoose
  .connect(DB)
  .then(() => {
    console.log("app connected to database");
    app.listen(PORT, () => {
      console.log(`App connected to database http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
