const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
require('dotenv').config()
const userRoutes = require("./Routes/UserRoutes")
const MsgRoute = require("./Routes/MsgRoute");

const app = express()






// Connecting To DataBase
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DATABASE Connected")
}).catch((err)=>{
    console.log(err)
})


// Variables 
const PORT = process.env.PORT || 5000;


// Middlewares 
app.use(cors())            //Cross origin 
app.use(express.json())    //Parses Incoming JSON requests
app.use("/api/auth",userRoutes)
app.use("/api/messages",MsgRoute)



//Running Server On Port
const server = app.listen(PORT,()=>{
    console.log(`Server is running on PORT-${PORT}`)
})

const io = require("socket.io")(server,{
    cors:{
                origin:"*",
                 Credential:true
            }
})



global.onlineUser = new Map();

io.on("connection",(socket)=>{

    global.chatSocket = socket;
   
    socket.on("add-user",(userId)=>{
        onlineUser.set(userId,socket.id)
    })                                                              

    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUser.get(data.to);
        // console.log(data)
    
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.message)
        }
    })
})


