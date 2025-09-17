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
      !req.body.genre
    ) {
      return res.status(400).json({
        message: `Send all required fields: title, author, publishYear, genre`,
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
      genre: req.body.genre,
    };

    const book = await Book.create(newBook);
    return res.status(201).json({ data: book });
  } catch (error) {
    console.log(error);
  }
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
export default router;
