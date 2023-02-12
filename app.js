const express = require("express");
const bodyParser = require("body-parser");
const path       = require("path");
const date       = require(__dirname+"/date.js")
const dotenv  = require('dotenv');
const mongoose=require("mongoose");
const Items = require('./model/itemSchema')
dotenv.config();

const app = express();
const workItems   = [];

app.use(express.static(path.join(__dirname,'/public')));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');




mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONG_URI)
  .then(() => console.log('data base Connected!'));

app.post('/',async(req,res)=>{
    const userData  = req.body;
    console.log(userData)
    try{
       const item = new Items({
        name:userData.newItem
        
       })
       await item.save()
       res.redirect("/")
    }catch (error) {
        console.log(error)
     } 
    
     
}) 

app.get("/",(req,res)=>{
  const day = date.getDate();
  const query = Items.find({}); // create the query instance
  query.exec() // execute the query
    .then(items => {
        res.render("list",{listTitle:day,newListItems:items});
    })
    .catch(error => {
      console.error(error);
    });
  
});
    
app.post('/delete/:id', async(req, res) => {
    const itemId = req.params.id;
    console.log(itemId)
    const item = await Items.findByIdAndDelete({_id:itemId})
    console.log(item)
    res.redirect('/'); 
  });

app.get("/work",(req,res)=>{
    res.render("list",{listTitle:"WorkList",newListItems:workItems})
})
 
app.get("/about",(req,res)=>{
    res.render("about");
})



app.listen(3000,()=>{
    console.log(`server is running at port`);
}) 