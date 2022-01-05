const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//mongoose - connecting todo list with a database
mongoose.connect("mongodb://localhost:27017/todolistDB");
const itemsSchema = {name: String}
const Item = mongoose.model("Item", itemsSchema);

// const item1 = new Item({name: "Test 1"});
// const item2 = new Item({name: "Test 2"});
// const item3 = new Item({name: "Test 3"});

// const defaultItems = [item1, item2, item3];

// Item.insertMany(defaultItems, (err)=>{
//   if(err){
//     console.log(err);
//   } else{
//     console.log("Successfully inserted records to collection");
//   }
// });

app.get("/", function(req, res) {
  Item.find({}, (err, results) =>{
    res.render("list", {listTitle: "Today", newListItems: results});
  });
});

app.get("/about", function(req, res){
  res.render("about");
});

app.post("/", function(req, res){
  const item = req.body.newItem;
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

