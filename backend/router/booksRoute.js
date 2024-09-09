import express from 'express';
import { Book } from '../model/book.model.js';
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
        res.status(401).send({
          message: `send all required fields: title, author, publishYear, genre`,
        });
      }
  
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
        genre: req.body.genre,
      };
  
      const book = await Book.create(newBook);
      return res.status(201).send(book);
    } catch (error) {
      console.log(error);
    }
  });
  

// route to get all books
router.get("/", async (req, res) => {
    try {
      const books = await Book.find({});
      return res.status(200).json({
        count: books.length,
        data: books,
      });
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
  
      return res.status(200).send({
        count: book.length,
        data: book,
      });
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
        res.status(401).send({
          message: `send all required fields: title, author, publishYear, genre`,
        });
      }
  
      const { id } = req.params;
  
      const update = await Book.findByIdAndUpdate(id, req.body);
  
      if (!update) {
        return res.status(404).send(`Book not found`);
      }
  
      return res.status(200).send(`Book Updated Successfully!`);
    } catch (error) {
      return res.status(500).send({
        error: {
          message: `Internal Server Error`,
        },
      });
    }
  });
  
//To update just the data of a book
router.patch("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await Book.findByIdAndUpdate(id, req.body);
  
      if (!result) {
        res.status(404).send(`Book not found`);
      }
  
      res.status(200).send(`Book Updated Succesfully!`);
    } catch (error) {
      return res.status(500).send(error);
    }
  });

// To delete a whole book.
router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const deleteReq = await Book.findByIdAndDelete(id);
  
      if(!deleteReq){
        return res.status(404).send(`Book not found`);
      }
  
      return res.status(200).send(`Book deleted successfully`);
    } catch (error) {
      return res.status(500).send(error)
    }
  })

export default router;