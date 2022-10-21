const { sequelize }= require("../models")
const db=require('../models')
const Purchase = db.purchase
const Book=db.bookmany
const { StatusCodes } = require('http-status-codes')
const CustomAPIError=require('../errors/custom-error')
const User = db.user

const checkAvailability = async(req, res) => 
{
     
    const data = await Book.findByPk(req.params.id)
    if(!data)
    {
        throw new CustomAPIError("No book with id")
    }
    if(data.quantity === 0) {
        throw new CustomAPIError("Book is out of stock")
    }
    res.status(StatusCodes.CREATED).json({ message:"Book is available.details about the book is given",details:data})
}

const purchaseBook=async(req,res)=>{

    //start a transaction from  connection and save it into a variable
    const t = await sequelize.transaction();

    try
    {
    
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
    const bookQuantity = data.quantity;
    const itemQuantity= purchaseDetails.quantity;
    if(bookQuantity-itemQuantity < 0) 
    {
        throw new CustomAPIError(' books unavailable')
    }
    Book.findOne({
        where : {
            id:req.params.id
        }
    }).then(book => {
        book.decrement('quantity',{by:itemQuantity});
    
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
const purchaseReport = async(req,res)=>
    {
        User.hasMany(Purchase);
        Purchase.belongsTo(User);  
        const users = await Purchase.findAll({ include:[{model: User,attributes:['name','email']}]});
        res.status(StatusCodes.CREATED).json({purchasedetails:users})
    }
    


module.exports={checkAvailability,purchaseBook,purchaseReport}
