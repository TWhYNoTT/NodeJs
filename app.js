const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose")
const dotenv = require('dotenv');

const app = express();
dotenv.config()



const authenticateToken = require("./middlewares/AuthenticateToken");
const errorMiddleware = require("./middlewares/errorMW")

const registerRouter = require("./routes/Register");
const authRouter = require("./routes/Auth");
const userInformation = require("./routes/userInformation");
const post = require("./routes/Post");



mongoose.connect(process.env.DB_URI)
    .then(() => { console.log("Connect to database..") })
    .catch(console.log);

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





//Mount routs
app.use("/api/register", registerRouter);
app.use("/api/login", authRouter);
app.use("/api/userinformation", authenticateToken, userInformation);
app.use("/api/post/", post);

app.use(errorMiddleware)


const port = process.env.PORT || 3000;




app.listen(port, () => { console.log(`Listening to port ${port}...`) });
