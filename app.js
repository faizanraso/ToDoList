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


app.get("/", function(req, res) {
  Item.find({}, (err, results) =>{
    res.render("list", {listTitle: "Today", newListItems: results});
  });
});

app.post("/", function(req, res){
  const item = req.body.newItem;
  Item.create({name: item}, (err) =>{} );
  res.redirect("/");
});

app.post("/delete", (req, res)=> {
  itemToDelete = req.body.checkbox;
  Item.deleteOne({_id: itemToDelete}, (err)=>{});
  res.redirect("/");
});

app.listen(3000, () => console.log("server has begun running on port 3000"));

