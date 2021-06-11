// Check browser support
if (typeof(Storage) !== "undefined"){
    if(typeof localStorage.getItem("todos") !== "string"){
        localStorage.setItem("todos", JSON.stringify([]));
    }
} else {
    document.getElementById("body").innerHTML = "Sorry, your browser does not support Web Storage...";
}

let todos = JSON.parse(localStorage.getItem("todos"));

function add() {
    const value = document.getElementById("value").value;

    if(value !== ""){
        todos.push({id: todos.length+1, value, checked: false});
        updateLocalStorage();
        updateHTML();
        document.getElementById("value").value = "";
    }
}

function reset() {
    todos = [];
    updateLocalStorage(); 
    updateHTML();
}

function updateLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));    
}

function updateHTML() {
    const todosElement = document.getElementById("todos");
    let html = `<div class="list-group">`;

    for (const todo of todos) {
        html += `
            <a href="#" onclick="updateCheckbox(${todo.id})" class="list-group-item list-group-item-action ${todo.checked ? "active":""}" aria-current="true">
                <div class="row justify-content-center align-items-center ">
                    <div class="col-6 d-flex align-items-center">
                        <h5 class="m-0">${todo.value}</h5>
                    </div>
                    <div class="col-6 d-flex justify-content-end">
                        <i class="mb-2 bi bi-x" onclick="deleteTodo(${todo.id})"></i>
                    </div>
                </div>
            </a>
        `;
    }

    todosElement.innerHTML = html + `</div>`;
}

function deleteTodo(id) {
    todos = todos.filter(function( todo ) {
        return todo.id !== id;
    });
    updateLocalStorage(); 
    updateHTML();
}

function updateCheckbox(id) {
    const todoId = todos.findIndex(todo => todo.id == id);
    todos[todoId].checked = !todos[todoId].checked;
    updateLocalStorage(); 
    updateHTML();
}

updateHTML();