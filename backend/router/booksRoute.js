import express from "express";
// import { Mongoose } from "mongoose";
import { Book } from "../model/book.model.js";
const router = express.Router();

//Route for saving a new book
router.post("/", async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear ||
      !req.body.genre ||
      !req.body.downloadUrl
    ) {
      return res.status(400).json({
        message: `Send all required fields: title, author, publishYear, genre, downloadUrl`,
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
      genre: req.body.genre,
      downloadUrl: req.body.downloadUrl,
    };

    const book = await Book.create(newBook);
    return res.status(201).json({ data: book });
  } catch (error) {
    console.log(error);
  }
});

// In booksRoute.js
router.get('/download/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book || !book.filePath) {
    return res.status(404).send('File not found');
  }
  res.download(book.filePath); // filePath is the path to the file on your server
});

// route to get all books
router.get("/all", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({ count: books.length, data: books });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// route to get one book
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ data: book });
  } catch (error) {
    return res.status(500).send(error);
  }
});

//route for updating a book entirely
router.put("/:id", async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear ||
      !req.body.genre
    ) {
      return res.status(400).json({
        message: `Send all required fields: title, author, publishYear, genre`,
      });
    }

    const { id } = req.params;

    const update = await Book.findByIdAndUpdate(id, req.body, { new: true });

    if (!update) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book updated successfully", data: update });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//To update just the data of a book
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book updated successfully", data: result });
  } catch (error) {
    return res.status(500).send(error);
  }
});

// To delete a whole book.
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteReq = await Book.findByIdAndDelete(id);

    if (!deleteReq) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/api/allbooks-title", async (req, res) => {
  try {
    const allBooks = await Book.find({});
    return res.status(200).json({ count: allBooks.length, data: allBooks });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Could not fetch the books, check your network" });
  }
});
router.get("/api/books-genre/:genre", async (req, res) => {
  try {
    const { genre } = req.params;
    const booksByGenre = await Book.find({ genre: genre });
    if (booksByGenre.length === 0) {
      return res.status(404).json({ message: "No books found for the specified genre" });
    }
    return res.status(200).json({ count: booksByGenre.length, data: booksByGenre });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Could not fetch the books, check your network" });
  }
});
export default router;
