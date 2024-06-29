const mongoose=require('mongoose')

mongoose.connect(process.env.DATABASE).then(out=>{
    console.log("________MongoDB Server Connected________");
}).catch(error=>{
    console.log(`________MongoDB Server Not Connected________::${error}`);
})

