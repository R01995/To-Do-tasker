const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const route = require("./src/routes/api");
const rateLimit = require("express-rate-limit");



app.use(cors());
app.use(bodyParser.json());

app.use(
    rateLimit({
        windowMs: 60 * 60 * 1000, //  1 hour
        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    })
)



const uri = `mongodb+srv://prictic:<password>@cluster0.l0f9rc6.mongodb.net/todotasker?retryWrites=true&w=majority`;
//mongodb+srv://prictic:prictic@cluster0.l0f9rc6.mongodb.net/
const options = {user:"prictic", pass:"prictic"};

mongoose.connect(uri, options)
    .then(() => {
        console.log("DB connected")
    })
    .catch((err) => {
        console.log(err)
    })



app.use("/api/v1", route)

app.use("*", (req, res) => {
    res.status(404).json({message: "Page Not Found"})      
})


module.exports = app;