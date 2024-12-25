const express= require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express()
app.use(express.json())
app.use(cors())

//connection
mongoose.connect('mongodb://localhost:27017/newdb').then(()=>console.log("db is connected")).catch((err)=>console.log(err));

//create schema
const bookschema= new mongoose.Schema({
  Isbn: {required:true,type:String ,unique:true},
  Bookname:{required:true,type:String},
  Category:{required:true,type:String},
  Quantity:{required:true,type:Number}

})
//create model
const bookmodel=mongoose.model('book',bookschema);

//adding products -POST REQUEST
app.post('/api/books',async (req,res)=>
{
  const {Isbn,Bookname,Category,Quantity}=req.body;
  try{
    //call the model simply to add the books
     const newbook=bookmodel({Isbn,Bookname,Category,Quantity});
     await newbook.save()
     res.status(201).json(newbook)
  }
  catch(error){
    console.error(error.message)
     res.status(404).json({message: error.message})
  }
})

//searching for a product
app.get('/api/books/:Isbn',async(req,res)=>
{
  const{Isbn}=req.params
  try{
       const findid= await bookmodel.findOne({Isbn});
       if(!findid)
       {
         res.status(404).json({message:"product not found"})
       }
       else
       {
        res.json(findid)
       }
  }
  catch(error)
  {
    console.error(error.message)
    res.status(404).json({message: error.message})
  }
})

//displaying all the books
app.get('/api/books' , async(req,res)=>
{
  try
  {
           const data=await bookmodel.find({});
           if(!data)
           {
             res.status(201).json({message:"no such product exists"})
           }
           else
           {
             res.json(data);
           }
  }
  catch(error)
    {
      console.error(error.message)
      res.status(404).json({message: error.message})

    }
  
})

//deleting a product
app.delete('/api/books/:Isbn',async(req,res)=>
{
     const {Isbn}=req.params;
     try{
       const data=await bookmodel.findOneAndDelete({Isbn});
       if(!data)
       {
        res.status(404).json({message:"book not available"})
       }
       res.status(204).end();

     }
     catch(error)
    {
      console.error(error.message)
      res.status(404).json({message: error.message})

    }
     
})

//updating the product
app.put('/api/books/:Isbn',async(req,res)=>
{
  try{
      const updates=req.body;
      const findid= await bookmodel.findOne({Isbn:req.params.Isbn})
      if(!findid)
      {
         res.status(404).json({message:"cant find product"})
      }
      else{
     const productupdated=await bookmodel.findOneAndUpdate({Isbn:req.params.Isbn},
      {$set:updates},{new:true})
      // res.status(201).json({message:"success"});
      res.json({productupdated});
      }

  }
  catch(error)
    {
      console.error(error.message)
      res.status(404).json({message: error.message})

    }
})

const port=process.env.PORT || 3000;
app.listen(port,()=>{
  console.log(`server is listening at the port ${port}`);
})