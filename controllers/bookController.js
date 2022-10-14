const db = require("../models");
const { StatusCodes } = require("http-status-codes")
const Book = db.bookmany;

 // Retrieve all Tutorials from the database.
exports.getAllBooks = async(req, res) => {
    const book = await Book.findAll({})
     res.status(StatusCodes.CREATED).json({ book })
  };
// Create and Save a new book
exports.createBook = async(req, res) => {
    const book=await Book.create(req.body)
    console.log(book)
     res.status(StatusCodes.CREATED).json({ book })
};


// Find a single book with an id
exports.getBook = async(req, res) => {
    
    const book=await Book.findByPk(req.params.id)
    res.status(StatusCodes.CREATED).json({ book })
};

// Update a book by the id in the request
exports.updateBook = async(req, res) => {
    const id = req.params.id;
    await Book.update(req.body,{where: { id: id }})
    const book=await Book.findByPk(req.params.id)
      res.status(StatusCodes.CREATED).json({ message:"updated successfully",new_book:book })
};

// Delete a book with the specified id in the request
exports.deleteBook = async(req, res) => {
    const id = req.params.id;
    const book=await Book.findByPk(req.params.id)
    await Book.destroy({where: { id: id }})
      res.status(StatusCodes.CREATED).json({ message:"deleted successfully",deleted_book:book })
  
};






