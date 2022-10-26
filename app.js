const express = require("express");
const app = express();
require("express-async-errors");
const db = require("./models");
const fileUpload = require("express-fileupload");
const authRouter = require("./routes/authRoute");
const notFoundMiddleWare = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");
const AuthenticationMiddleware = require("./middleware/authentication");
const BookRouter = require("./routes/bookRoute");
const purchaseRouter = require("./routes/purchaseRoute");


// parse requests of content-type - application/json
app.use(express.json());
app.use(fileUpload({ useTempFiles: false }));


//routes
app.use('/api/v1/',authRouter);
app.use('/api/v1/books',AuthenticationMiddleware,BookRouter);
app.use('/api/v1/purchase',AuthenticationMiddleware,purchaseRouter);

//middleware
app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleware);

db.sequelize.sync().then(() => {
     console.log("synced db");
}).catch((err)=>{
 
   console.log("failed"+err.message);
});

const port=process.env.PORT||7000;

app.listen(port,()=>
{
     console.log(`server is listening on ${port}...`);
});
