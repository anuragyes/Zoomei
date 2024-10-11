import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketmanager.js"

import cors from "cors";

import userRoutes from "./routes/users.routes.js"

const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", (process.env.PORT || 8000))
app.use(cors());
 app.use(express.json({ limit: "40kb" }));
 app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);


app.get('/home', (req, res) => {
    res.send('Hello, World!');
});

const start = async () => {
    app.set("mongo_user")
     const connectionDb = await mongoose.connect("mongodb+srv://anuragpandey2203:anuragpandey2203@cluster1.ypsjv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1")


    console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`)
    server.listen(app.get("port"), () => {
        console.log("LISTENIN ON PORT 8000")
    });



}



start();