import express from "express";
import { mongoDBURL, PORT } from "./server.js";
import mongoose from "mongoose";
import { Book } from "./model/book.model.js";
import booksRoute from "./router/booksRoute.js";
import cors from 'cors';

const app = express();

//it allows us use json in our express backend. // app.use allows us use middlewares more often.
// middleware for parsing in request body
app.use(express.json());


// CORS -> Cross-Origin Resource Sharing
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type']
}))
app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to MERN Stack Tutorial");
});

app.use('/books', booksRoute);

//Connect my MongoDB database to my VS code
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app connected to database");
    app.listen(PORT, () => {
      console.log(`App connected to database http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// app.get("/", (request, response) => {
//   console.log(request);
//   return response.status(234).send(`This is MERN Stack port`);
// });

// // //Path for save a new Book

// app.post("/books", async (request, response) => {
//   try {
//     if (
//       !request.body.title ||
//       !request.body.author ||
//       !request.body.publisherYear
//     ) {
//       return response.status(201).send({
//         message: "send all required fields: title, author, publisherYear",
//       });
//     }
//     const newBook = {
//       title: request.body.title,
//       author: request.body.author,
//       publisherYear: request.body.publisherYear,
//     };
//     const book = await Book.create(newBook);
//     return response.status(201).send(book);

//   } catch (error) {
//     console.log(error);
//   };
// });

// // // // path for Get All Books for database
// // // app.get('/books', async (request, response) => {
// // //     try {
// // //         const books = await Book.find({});
// // //         return response.status(200).json(books);
// // //     } catch (error) {

// // //     }
// // // })

// mongoose
//   .connect(mongoDBURL)
//   .then(() => {
//     console.log(`App connected to mongodb database`);
//     app.listen(PORT, () => {
//       console.log(`This is the initialized port: ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// app.use(express.json());
// app.listen(PORT, () => {
//   console.log("Try port");
// });
