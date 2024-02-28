import express from "express"
import Router from "./routes/routes.js"
//import cors from "cors"
 
const app = express()

app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next()
  })
app.use(Router)
//app.use(cors())
app.listen(5001, () => console.log('Server running at http://localhost:5001'))
