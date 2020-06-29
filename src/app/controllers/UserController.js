const mongoose = require("mongoose");
const User = require("../models/User");
const Books = require("../models/Book");
const Book = require("../models/Book");
const { findOne } = require("../models/User");

// Aggregating User to Books 
// const aggregate = User.aggregate([{$match: {"email":"matheus@gmail.com"}, {$lookup: {from:"books",
//  localField: "Book", foreignField:"_id", as: "books"}}}]);

// const aggregation = User.aggregate([
//   {}
// ])

class UserController {

  // Aggregating Books to User
  // Todas as promisses possuem [] e os pipelines {} (um ocorre por vez)
  // from: coleção, localField: nome que eu dei a Relação(schemas), foreignField:id da coleção estrangeira, as: nome que ele vai aparecer
  async aggregateBooksToUser(req, res) {
    const userId = mongoose.Types.ObjectId(req.params.id);

    const bookToUser = await Books.aggregate([{
      $match: { "_id": userId }
    },
    {
      $project: { book: 1}
    },
    {
      $lookup: { from: "books", localField: "book", foreignField: "_id", as: "book" }
    }
    ]);
    // return não precisa de await, mas se tiver criando uma variável eu irei precisar
    return res.status(200).json(bookToUser);
  }

  async index(req, res) {
    try {
      const users = await User.find({});

      return res.status(200).json(users);
    } catch (error) {
      console.log({ error });
    }
  }

  async store(req, res) {
    try {
      const { name, email, password, bookID } = req.body;

      const book = mongoose.Types.ObjectId(bookID)

      // const book = await Book.findOne({bookID})
      
      const emailExists = await User.findOne({ email });

      if (emailExists) {
        return res.status(409).json({ message: "Email já existente!" });
      }

      const user = await User.create({
        name,
        email,
        password,
        book,
      });

      user.password = undefined;

      return res.status(201).json(user).send({
        message: "Created."
      });
    } catch (error) {
      console.log({ error });
    }
  }

  async show(req, res) {
    try {
      const id = req.params.id;

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.log({ error });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;

      const userUpdate = await User.updateOne(
        { _id: id },
        {
          $set: { ...data },
        }
      );

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.log({ error });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;

      const user = await User.findByIdAndDelete(id);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.log({ error });
    }
  }

  // async showBookByUser( req, res) {
  //   return User.findOne({ name: name }).populate('books').exec((err, books) => {
  //     console.log("Populate User" + books);
  //   })
  // }


}

module.exports = new UserController();
