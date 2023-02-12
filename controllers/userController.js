const date       = require('../date');


const login=(req,res)=>{
    const day = date.getDate();
    res.render("list",{listTitle:day,newListItems:items});
  }

  module.exports={
    login
  }