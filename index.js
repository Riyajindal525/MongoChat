const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const Chat = require("./models/chat");
const methodOverride = require("method-override");

app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

mongoose.connect('mongodb://127.0.0.1:27017/MongoChat')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Set EJS
app.set("views", path.join(__dirname, "views")); 
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname,"public")));

const port = 8080;

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});

//Home route
app.get("/", (req, res) => {
    res.render("home.ejs");    
});

app.get("/chats", async(req,res)=>{
         let Chats = await Chat.find();
         res.render("chat.ejs",{Chats});
});

//New chat 
app.get("/chats/new",(req,res)=>{
  res.render("new.ejs");
});


app.post("/chats", async (req, res) => {
  try {
    let { from, message, to } = req.body;

    let newChat = new Chat({
      from,
      message,
      to,
      created_at: new Date(),
      
    });

    await newChat.save();
    console.log("Chat Added!");
    res.redirect("/chats");
  } catch (err) {
    console.error(" Error adding chat:", err);
    res.status(500).send("Something went wrong!");
  }
});


//EDIT ROUTE
app.get("/user/:id/edit",async(req,res)=>{
    let { id } = req.params;
    let chat = await Chat.findOne({_id : id});
    res.render("edit.ejs",{chat});
});

app.put("/user/:id", async (req, res) => {
  try {
    let { id } = req.params;       
    let { message } = req.body;    

    
    let updatedChat = await Chat.findOneAndUpdate(
      { _id: id },                 
      { message: message,edited : true,created_at: new Date()},
      { new: true, runValidators: true } 
    )
    res.redirect("/chats");
  } catch (err) {
    console.error("Error updating chat:", err);
    res.status(500).send("Something went wrong!");
  }
});

//Delete route
app.delete("/user/:id", async (req, res) => {
  try {
    let { id } = req.params;   
    await Chat.findByIdAndDelete(id);  
    console.log("Chat deleted:", id);
    res.redirect("/chats");    
  } catch (err) {
    console.error("Error deleting chat:", err);
    res.status(500).send("Something went wrong!");
  }
});

