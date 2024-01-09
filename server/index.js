const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();

// Parse the body passed to json object
app.use(bodyParser.json());


// Get all todos
app.get("/todos", (req, res)=>{

    fs.readFile("../data.txt", "UTF-8", (err, data)=>{
        if(data)
        {
            res.status(200).send(JSON.parse(data));
        }
        else{
            res.status(404).send();
        }
    })

    return;
    
});

// Save new todo
app.post("/todo", (req, res)=>{
    const newTodo = {
        id : Math.floor(Math.random()*100000),
        title : req.body.title,
        description : req.body.description
    }
    fs.writeFile("../data.txt", JSON.stringify(newTodo), (err)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            console.log("success");
        }
    });
    res.status(200).json(newTodo);
    
});


function findIndex(arr, id)
{
    for(var i=0; i<arr.length; i++)
    {
        if(arr[i].id === id)
        {
            return i;
        }
    }
    return -1;
}

function removeAtIndex(arr, index)
{
    let newArray = [];
    for(var i=0; i< arr.length; i++)
    {
        if(i != index)
        {
            newArray.push(arr[i]);
        }
    }
    return newArray;
}
// Delete a todo with given id
app.delete("/todo/:id", (req, res)=>{
    var id = req.params.id;
    var todoIndex = findIndex(todos, parseInt(id));
    if(todoIndex === -1)
    {
        res.send(404).send("Not found");
    }
    todos = removeAtIndex(todos, todoIndex);
    res.status(200).send("found "+id);
})

app.listen(3000, ()=>{
    console.log("server running on port 3000!");
})