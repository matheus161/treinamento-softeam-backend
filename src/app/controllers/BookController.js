const mongoose = require("mongoose");
const Book = require("../models/Book");
const User = require("../models/User");
const { use } = require("../routes");



class BookController {




  // List every books
  async index(req, res) {
    try {
      const books = await Book.find({});

      return res.status(200).json(books);
    } catch (error) {
      console.log({ error });
    }

  }

  // List specific Book
  async show(req, res) {
    const book = await Book.findById(req.params.id);
    return res.status(200).send(book)
  }

  // Create Book
  async store(req, res) {
    try {
      const { name, author, releaseDate } = req.body;

      const book = await Book.create({
        name,
        author,
        releaseDate,
      });
      return res.status(201).json(book).send({
        message: "Created."
      });
    } catch (error) {
      console.log({ error });
    }
  }


  // Update Book
  async update(req, res) {
    try {
      await Book.findByIdAndUpdate(req.params.id, req.body);
      return res.status(200).send({
        message: 'Updated.'
      });
    } catch (err) {
      res.status(400).send({
        message: 'Object Does Not Exists.',
      });

    }
  }

  // Delete Book
  async destroy(req, res) {
    const book = await Book.findByIdAndRemove(req.params.id);
    return res.status(200).send({
      message: 'Deleted.',
    });
  }


}

module.exports = new BookController();

