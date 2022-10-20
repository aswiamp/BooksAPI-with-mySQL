const { sequelize }= require("../models")
const db=require('../models')
const Purchase = db.purchase
const Book=db.bookmany
const { StatusCodes } = require('http-status-codes')
const CustomAPIError=require('../errors/custom-error')
const user = require("../models/user")

const checkAvailability = async(req, res) => {
     
    const data = await Book.findByPk(req.params.id)
    if(!data){
        throw new CustomAPIError("No book with id")
    }
    if(data.quantity === 0) {
        throw new CustomAPIError("Book is out of stock")
    }
    res.status(StatusCodes.CREATED).json({ message:"Book is available.details about the book is given",details:data})
}

const purchaseBook=async(req,res)=>{
    const t = await sequelize.transaction();

    try
    {
    //start a transaction from  connection and save it into a variable
    
    const data = await Book.findByPk(req.params.id)
    if(!data){
        throw new CustomAPIError("No book with this id,please enter another id")
        
    }
    if(data.quantity === 0) {
        throw new CustomAPIError("Book is out of stock")
    }
    const price = data.price;
    const purchaseItem = {quantity : req.body.quantity,bookId: req.params.id,userId:req.body.userId,totalPrice: req.body.quantity * price };
    const purchaseDetails = await Purchase.create(purchaseItem,{t})
    const bookQty = data.quantity;
    const itemQty = purchaseDetails.quantity;
    if(bookQty-itemQty < 0) 
    {
        throw new CustomAPIError(' books unavailable')
    }
    //const new_quantity=bookQty-itemQty

    Book.findOne({
        where : {
            id:req.params.id
        }
    }).then(book => {
        book.decrement('quantity',{by:itemQty});
    
    },{t});
    res.status(StatusCodes.CREATED).json({purchaseDetails})
    await t.commit();
}
    catch(error)
    { 
        await t.rollback();
        throw new CustomAPIError(error)
    }
}
    //get purchase details
    // const purchaseReport = async(req,res)=>
    // {
       
    // }
    // //purchase report
    // const report = await getPurchaseReport()
    // {

    //}

 
    
module.exports={checkAvailability,purchaseBook}
