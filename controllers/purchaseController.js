const { sequelize } = require("../models");
const db = require("../models");
const Purchase = db.purchase;
const Book = db.bookmany;
const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors/custom-error");
//const purchase = require("../models/purchase")
const User = db.user;

//pagination
const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: purchase } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, purchase, totalPages, currentPage };
};

const checkAvailability = async (req, res) => {
    const data = await Book.findByPk(req.params.id);
    if (!data) {
        throw new CustomAPIError("No book with id");
    }
    if (data.quantity === 0) {
        throw new CustomAPIError("Book is out of stock");
    }
    res.status(StatusCodes.CREATED).json({
        message: "Book is available.details about the book is given",
        details: data,
    });
};

const purchaseBook = async (req, res) => {
    //start a transaction from  connection and save it into a variable
    const t = await sequelize.transaction();

    try {
        const data = await Book.findByPk(req.params.id, { transaction: t });
        if (!data) {
            throw new CustomAPIError(
                "No book with this id,please enter another id"
            );
        }
        if (data.quantity === 0) {
            throw new CustomAPIError("Book is out of stock");
        }
        const price = data.price;
        const purchaseItem = {
            quantity: req.body.quantity,
            bookId: req.params.id,
            userId: req.body.userId,
            totalPrice: req.body.quantity * price,
        };
        const purchaseDetails = await Purchase.create(purchaseItem, {
            transaction: t,
        });
        const bookQuantity = data.quantity;
        const itemQuantity = purchaseDetails.quantity;
        if (bookQuantity - itemQuantity < 0) {
            throw new CustomAPIError(" books unavailable");
        }

        let book = await Book.findOne({
            where: { id: req.params.id },
            transaction: t,
        });
        await book.decrement("quantity", {
            by: itemQuantity,
            transaction: t,
        });
        await t.commit();
        res.status(StatusCodes.CREATED).json({ purchaseDetails });
    } catch (error) {
        await t.rollback();
        throw new CustomAPIError(error);
    }
};
//get purchase details
const purchaseReport = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    Purchase.findAndCountAll({
        limit,
        offset,
        include: [
            { model: User, attributes: ["name", "email", "role"] },
            { model: Book, attributes: ["name", "author", "imageurl","pages"] },
        ],
    }).then((data) => {
        const response = getPagingData(data, page, limit);
        res.send(response);
    });
};
module.exports = { checkAvailability, purchaseBook, purchaseReport };
