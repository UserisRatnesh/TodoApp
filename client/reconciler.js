function createDOMElement(data)
{
    console.log(data);

    //DOM manipulation

    // accessing the mainArea div by using ID
    var parentElement = document.getElementById("mainArea");
    parentElement.innerHTML = "";

    // for each child create div and two spans each for title and descriptio
    data.map(todo =>{
        var childElement = document.createElement("div");
        var childTitle = document.createElement("span");
        childTitle.innerHTML = todo.title;
        var childDescription = document.createElement("span");
        childDescription.innerHTML = todo.description;

        // adding delete button
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        
        // Implementing delete function
        deleteButton.setAttribute("onclick" ,"deleteTodo("+ todo.id + ")");

        // appending each child to div created
        childElement.appendChild(childTitle);
        childElement.appendChild(childDescription);
        childElement.appendChild(deleteButton);

        // adding id attribute to the div
        childElement.setAttribute("id", todo.id);

        // appending the div created to parent div already present
        parentElement.appendChild(childElement);
    });

}

window.setInterval(()=>{
    let todos = [];
    for(let i=0; i< Math.floor(Math.random()*100); i++)
    {
        todos.push({
            title : "gym",
            description : "Go to gym",
            id : i+1
        })
    }

    createDOMElement(todos);
}, 1000);

