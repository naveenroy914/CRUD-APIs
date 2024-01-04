const express = require('express');
const mongoose = require('mongoose')
const  Todo = require('./todos')

const app = express();

app.use(express.json())


mongoose.connect('mongodb+srv://rnaveenkumar:Naveen914@cluster0.6lgcxjt.mongodb.net/').then(
    () => console.log('DB Connected')
).catch(err => console.log(err))

app.post('/addtodos', async (req, res) => {
    const {todo} = req.body ;
    try {
        const newData = new Todo({todo});
         await newData.save();
        return res.json(await Todo.find())
    }
    catch(err){
        console.log(err.message)
    }
   
})


app.get('/getalltodos', async (req, res) => {
    try {
        const allTodos = await Todo.find();
        return res.json(allTodos)

    }catch(err){
        console.log(err.message)
    }
})

app.get('getalltodos/:id', async (req, res) => {
    try {
          const Data = await Todo.findById(req.params.id)  
          return res.json(Data) 
        }
    catch(err){
        console.log(err.message)
    }
})


app.delete('/deletetodo/:id', async (req, res) => {
    try{
        await Todo.findByIdAndDelete(req.params.id)
        return res.json(await Todo.find())
    }
    catch(err){
        console.log(err.message)
    }
})


app.put('/updatetodo/:id', async (req, res) => {
    const { todo } = req.body;
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        { todo },
        { new: true } 
      );
      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      return res.json(updatedTodo);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ error: 'Server Error' });
    }
  });

app.listen(4002, ()=> console.log('Server Running!!'))