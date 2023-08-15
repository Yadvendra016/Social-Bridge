import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {readdirSync} from "fs";

const morgan = require("morgan");
require("dotenv").config();

const app = express();

//middleware
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ["http://localhost:3000"],
}));

// DATABASE
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log("database connected"))
    .catch((err) => console.log("DB connection error =>", err));

//autoload Routes
readdirSync('./routes').map((r) => app.use('/api',require(`./routes/${r}`)));

app.use((err, req, res, next) =>{
    if(err.name === "UnauthorizedError"){
        console.log(err);
        return res.status(401).json({error: "Unauthorized"});
    }
    next();
});

//listen app
const port = process.env.PORT || 8000;
app.listen(port, console.log(`Server is running at port ${port}`));
