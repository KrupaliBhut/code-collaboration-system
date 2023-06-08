const express = require("express");
const app = express();
// const con = require('./database/dbconnect.js');
// const userController=require('./controller/userController.js');
const createtable = require("./router/userroute");

// app.get('/add', userctrl.addUser);
app.set("view engine", "ejs");
app.use(express.json());
app.use("/", createtable);

app.listen(3000, () => {
  console.log(`Server is Running on 3000`);
});
