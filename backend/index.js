import express from "express";
import { mongoDBURL, PORT } from "./server.js";
import mongoose from "mongoose";
import { Book } from "./model/book.model.js";

const app = express()

app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send(`This is MERN Stack port`);
});

//Path for save a new Book

app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title || 
      !request.body.author ||
      !request.body.publisherYear
    ) {
        return response.status(201).send({
            message: "send all required fields: title, author, publisherYear",
        })
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publisherYear: request.body.publisherYear,
    };
    const book = await Book.create(newBook);
    return response.status(200).send(book);

  } catch (error) {
    console.log(error);
  }
});



// path for Get All Books for database
app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json(books);
    } catch (error) {
        
    }
})
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log(`App connected to mongodb database(${mongoDBURL})`);
    app.listen(PORT, () => {
      console.log(`This is the initialized port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// "test": "echo \"Error: no test specified\" && exit 1"
// password: Books-store
// username: IsraelOS


// if (!request.body.title){
    //     return response.status(234).send({
    //         message: "send in the required field",
    //     })
    // }