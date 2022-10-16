const express = require("express");
const app = express();
require("express-async-errors")
const db = require("./models");
const fileUpload = require("express-fileupload")
const notFoundMiddleWare = require("./middleware/notFound")
const errorHandlerMiddleware = require("./middleware/errorHandler")
const BookRouter = require("./routes/bookRoute");



// parse requests of content-type - application/json
app.use(express.json());
app.use(fileUpload({ useTempFiles: false }));


//routes
app.use('/api/v1/books',BookRouter)

//middleware
app.use(notFoundMiddleWare)
app.use(errorHandlerMiddleware);



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
