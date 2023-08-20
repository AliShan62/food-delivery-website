const express = require('express'); 
const app = express(); 
    
app.use(express.json()); 
   
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(  
      "Access-Control-Allow-Headers",    
      "Origin, X-Requested-With, Content-Type, Accept"
    ); 
    next();
  });  
  

const user=require("../backend/Routes/UserRoute");
//const orderDataRoute = require('../backend/Routes/OrderData');

app.use('/api/v1',user);

app.use('/api/v1',require("./Controllers/OrderData"));


 
module.exports = app;
 


