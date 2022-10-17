const db = require("../models");
const { StatusCodes } = require("http-status-codes")
const CustomAPIError = require("../errors/custom-error")
const BadRequestError = require("../errors/badRequest")
const path = require("path");
const short = require("shortid");
const Book = db.bookmany;

 // Retrieve all Tutorials from the database.
exports.getAllBooks = async(req, res) => {
    //const book = await Book.findAll({})
    const options = {
      page: req.query.page || 1, // Default 1
      paginate:4,
      order: [['name', 'ASC']],
    }
    const { docs, pages, total } = await Book.paginate(options)
        res.status(StatusCodes.CREATED).json({books:docs,page:pages,count:total});
     //res.status(StatusCodes.CREATED).json({ book })
  };
// Create and Save a new book
exports.createBook = async(req, res) => {
   // const book=await Book.create(req.body)
    const bookImage = req.files.imageurl;
  if (!bookImage.mimetype.endsWith("png")) {
    throw new BadRequestError("Please Upload png Image");
  }
  const maxSize = 1024 * 1024;
  if (bookImage.size > maxSize) {
    throw new BadRequestError("Please upload image smaller 1MB");
  }
  req.ui = short();
  const pathImage = req.ui + `${bookImage.name}`;
  const imagePath = path.join(__dirname, "../public/uploads/" + pathImage);

  await bookImage.mv(imagePath);
  req.body.imageurl = `/uploads/${pathImage}`;

  const book = await Book.create(req.body);
  res.status(201).json({ book });
     res.status(StatusCodes.CREATED).json({ book })
};


// Find a single book with an id
exports.getBook = async(req, res) => {
    
    const book=await Book.findByPk(req.params.id)
    if(!book)
    {
      throw new CustomAPIError("No book with id ")
    }
    res.status(StatusCodes.CREATED).json({ book })
};

// Update a book by the id in the request
exports.updateBook = async(req, res) => {
    const id = req.params.id;
    await Book.update(req.body,{where: { id: id }})
    const book=await Book.findByPk(req.params.id)
    if(!book)
    {
      throw new CustomAPIError("no book with this id")
    }
      res.status(StatusCodes.CREATED).json({ message:"updated successfully",new_book:book })
};

// Delete a book with the specified id in the request
exports.deleteBook = async(req, res) => {
    const id = req.params.id;
    const book=await Book.findByPk(req.params.id)
    if(!book)
    {
      throw new CustomAPIError("No book with id ")
    }
    await Book.destroy({where: { id: id }})
      res.status(StatusCodes.CREATED).json({ message:"deleted successfully",deleted_book:book })
  
};






