const app=require("./app")
const dotenv=require("dotenv");
const connectDatabase=require("./database"); 
const cors = require('cors');


///--------------error uncaughtException 
process.on("uncaughtException",err=>{
    console.log(`Error:${err.message}`)     
 
    console.log("Server shuting down due to uncaughtException") 
    server.close(()=>{
         process.exit(1);
    }) 
}) 




dotenv.config({ path:"../backend/config.env" })

connectDatabase()

// Add the cors middleware to your app
app.use(cors());

//here we are creating our  server----------------------
 //const port=3000;
const server=app.listen(process.env.port, ()=> {
  console.log(`Server running on port:${process.env.port}`);
});






//unhandled promise rejection error
process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`)

    console.log("Server shuting down due to unhandled promise rejection")
    server.close(()=>{
         process.exit(1);
    })
})

