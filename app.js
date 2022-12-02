const express = require("express");
const bodyParser = require("body-parser");
const path       = require("path");
const date       = require(__dirname+"/date.js")


const app = express();
const items  = ["wakeUp","Exercise","breakfast"];
const workItems   = [];

app.use(express.static(path.join(__dirname,'/public')));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

app.get("/",(req,res)=>{
  const day = date.getDate();
  res.render("list",{listTitle:day,newListItems:items});
});
   
app.post("/",(req,res)=>{
   const item= req.body.newItem;
     console.log(req.body.list)

    if(req.body.list === "WorkList"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/")
    } 
    
  
});

app.get("/work",(req,res)=>{
    res.render("list",{listTitle:"WorkList",newListItems:workItems})
})

app.get("/about",(req,res)=>{
    res.render("about");
})


app.listen(3000,()=>{
    console.log("server is running at port 3000");
}) 