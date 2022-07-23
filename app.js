const express = require("express");
const bodyParser = require("body-parser");
const getDate = require(__dirname+"/date");
const app = express();

app.set('view engine' , 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let items= [];
let workItems = [];

app.get("/" , function(req , res){
  let day =getDate.getDate();
    res.render("list",{listTitle : day, newItem : items});
});

app.post("/" , function(req,res){

  let item=req.body.enteredVal;
  console.log(req.body);
  if(req.body.button ==="Work list"){
    workItems.push(item);
    res.redirect("/work");
  }
  else{
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work" , function(req , res){
  res.render("list" , {listTitle : "Work list" , newItem : workItems});

});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function(){
    console.log("Server is running at port 3000");
});
