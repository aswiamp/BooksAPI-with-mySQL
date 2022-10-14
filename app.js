const express = require("express");
const app = express();
require("express-async-errors")
const db = require("./models");
//const ErrorHandler = require("./middleware/errorHandler")
const BookRouter = require("./routes/bookRoute")



// parse requests of content-type - application/json
app.use(express.json());
 
//app.use(ErrorHandler);

//routes
app.use('/api/v1/books',BookRouter)

db.sequelize.sync().then(() => {
     console.log("synced db");
}).catch((err)=>{
 
   console.log("failed"+err.message)
})

const port=process.env.PORT||7000

app.listen(port,()=>
{
     console.log(`server is listening on ${port}...`)
})
