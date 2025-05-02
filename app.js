const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodos = getTodos();
updateTodoList();
//console.log(allTodos);
todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();
    //ทดสอบข้อความว่า กด Enter แล้วมีการส่งข้อมูลออกไปไว้ใน Array ไหม
    //alert("Test"); 
})

function addTodo(){
    const todoText = todoInput.value;

    const todoObject = {
        text: todoText,
        completed: false
    }

    //ทดสอบข้อความ ว่าแสดงขช้อที่ที่พิมพ์ไปในช่องไหม
    //alert("todoText"); 

    //แสดงผลข้อความใน Console หรือกด F12
    //console.log(todoText);

    //ถ้าข้อความีความยาวมากว่า 0 ตัวอักษรให้ทำเงื่อนไขนี้
    if(todoText.length > 0){
        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
        //createTodoItem(todoText);
        todoInput.value = "";
    }
}

function updateTodoList(){
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex)=>{
        todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    })
}

//ฟังก์ชัน นำข้อความที่พิมพ์ มาแสดงผลเป็น List รายการ
function createTodoItem(todo, todoIndex){
    const todoId = "todo-"+todoIndex;
    const todoLI = document.createElement("li");
    const todoText = todo.text;

    todoLI.className = "todo";
    todoLI.innerHTML = `
                <input type="checkbox" id="${todoId}">
                <label class="custom-checkbox" for="${todoId}">
                    <!--ปุ่มเพิ่มรายการ เป้นแบบ SVG-->
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                    </svg>
                </label>

                <!--ข้อความ-->
                <label for="${todoId}" class="todo-text">
                    ${todoText}
                </label>

                <!--ปุ่มลบรายการ เป้นแบบ SVG-->
                <button class="delete-button">
                    <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>
                </button>
        `
    //todoLI.innerText = todo;
    //todoListUL.append(todoLI);

    const deleteButton = todoLI.querySelector(".delete-button");
    deleteButton.addEventListener("click", ()=>{
        deleteTodoItem(todoIndex);
    })

    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", ()=>{
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    })

    //คำสั่งให้ LocalStorage ล็อกการเช็คเอาไว้
    checkbox.checked = todo.completed;
    return todoLI;
}

function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, i)=> i !== todoIndex);
    saveTodos();
    updateTodoList();
}

function saveTodos(){
    //รหัสฝัง สำหรับการบันทึกข้อมุล คล้าย ๆ Cookie
    const todoJson = JSON.stringify(allTodos);
    localStorage.setItem("todos",todoJson)
}

function getTodos(){
    const todos = localStorage.getItem("todos")||"[]";
    return JSON.parse(todos);
}

