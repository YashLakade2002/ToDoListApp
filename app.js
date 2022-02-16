//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const _ = require("lodash");

dotenv.config({path : './config.env'});

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect('mongodb+srv://admin-yash:yash@todolistdb.j0tyo.mongodb.net/mytodolistDB', {useNewUrlParser : true})

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item",itemsSchema);

app.get('/', (req, res)=> {
  Item.find({}, (err, foundItems) => {
    res.render("list", {newListItems : foundItems});
  })
})

app.post("/", function(req, res){

  const itemName = req.body.newItem;

  const  item = new Item({
    name : itemName
  });

  item.save();
  res.redirect('/');
});


app.post("/delete", (req,res)=>{
  const checkedItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        res.redirect("/");
      }
    });
});


app.get("/about", function(req, res){
  res.render("about");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server has started");
});
