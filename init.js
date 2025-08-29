const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/MongoChat')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

    const Chat = require("./models/chat");

    let allChats =  [
    {from: "Riya", to: "College", message: "Please give me the details of curriculum of this year! 📚", created_at: new Date()},
    {from: "Rohan", to: "Friend", message: "Hey, are you free for a movie tonight? 🎬", created_at: new Date()},
    {from: "Sneha", to: "Mom", message: "I reached hostel safely. 🏫", created_at: new Date()},
    {from: "Amit", to: "Dad", message: "Can you send me some money this week? 💸", created_at: new Date()},
    {from: "Priya", to: "Bestie", message: "Let’s go shopping this weekend! 🛍️", created_at: new Date()},
    {from: "Vikram", to: "Teacher", message: "I couldn’t attend class, can I get the notes? 📝", created_at: new Date()},
    {from: "Anjali", to: "Cousin", message: "Happy Birthday! 🎂🥳", created_at: new Date()},
    {from: "Kunal", to: "Sports Coach", message: "Is football practice happening in the evening? ⚽", created_at: new Date()},
    {from: "Meera", to: "Friend", message: "Don’t forget to bring my book tomorrow. 📖", created_at: new Date()},
    {from: "Arjun", to: "Exam Cell", message: "When will the exam timetable be released? 📅", created_at: new Date()},
    {from: "Simran", to: "Brother", message: "All the best for your interview tomorrow! 💼", created_at: new Date()},
    {from: "Nikhil", to: "Friend", message: "Let’s meet in the canteen at 5 pm. 🍔", created_at: new Date()},
    {from: "Divya", to: "Sister", message: "How was your trip to Manali? 🏔️", created_at: new Date()},
    {from: "Rohit", to: "Bus Service", message: "Is there a bus at 6 pm for my route? 🚌", created_at: new Date()},
    {from: "Neha", to: "Principal", message: "Can I get approval for cultural event participation? 🎭", created_at: new Date()}
];
    
Chat.insertMany(allChats)
.then(() => {
    console.log(" chats inserted successfully ");
})
.catch(err => {
    console.error("Error inserting chats:", err);
});
