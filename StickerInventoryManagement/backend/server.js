//import express the modern way
import express from "express";

//import dotenv
import dotenv from "dotenv";

//For deployment:
import path from "path";

//import the connectDB function from db.js
import { connectDB } from "./config/db.js";

import stickerRoutes from "./routes/sticker.route.js"


//call the dotconfig function inside dotenv folder
dotenv.config();

//store the express function in a variable
const app = express();

//port that takes the value from the .env file or if .env port variable is
//unavailabe (or undefined), use the hard-coded port (5000)
const PORT = process.env.PORT || 5000

//For Deployment:
const __dirname = path.resolve();

//middleware that allows the server to parse through the body sent by the USER
//a middleware is a function that runs BEFORE THE SERVER SENDS A RESPONSE back to the USER
//simply allows the server to accept JSON data in the req.body
app.use(express.json());

//stickers endpoint that is added as a prefix for the routes extensions
//Ex: if a user requests a GET all method, ("/"), the code below will 
//add "/api/stickers" before the GET all extension ("/")
app.use("/api/stickers", stickerRoutes);

//check for the environment (Production or Development)
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

//server is listening to specified port
app.listen(PORT, () => {
    connectDB();
    console.log('Server started at http://localhost:' + PORT);
})