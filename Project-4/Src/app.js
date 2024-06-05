import express from 'express';
import cookieParse from 'cookie-parser' 
import cors from 'cors'

const app =express();


app.use(cors({                         
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"})) //json data 
app.use(express.urlencoded({extended:true,limit:"16kb"})) //url se data hai uske liye 
app.use(express.static("Public")) //public folder hai useme image icon url se jo data ayega wo store hoga 
app.use(cookieParse())

export {app}