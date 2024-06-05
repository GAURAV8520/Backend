//require('dotenv').config({path:'./env'})
import dotenv from 'dotenv'
import connectDB from './db/index.js'

const port =process.env.PORT||8000;


dotenv.config({
    path:'./env'
})



connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`server is running at port ${port}`)
    })

})
.catch((err)=>{
    console.log("MONGO db connection failed !!",err);

})
