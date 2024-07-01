require('dotenv').config()
const express =require('express')
const app= express()

//cors- connect with frontend
const cors=require('cors')
const router = require('./Routes/routes')
app.use(cors())

//convert all incoming json  data to js
app.use(express.json())

require('./db/connection')

app.use(router)

//export upload folder to clientapp 
app.use('/uploads',express.static('./uploads'))

const PORT=4000 || process.env.PORT
app.listen(PORT,()=>{
    console.log(`__________Porject Server Start At ${PORT}__________` );
})

