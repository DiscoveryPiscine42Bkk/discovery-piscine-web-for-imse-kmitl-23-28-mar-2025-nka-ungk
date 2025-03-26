document.addEventListener("DOMContentLoaded", () => { /*คำสั่ง EventListener จะต้องรอใหคำสั่งhtmlเส้ดหมดก่อน คือรอรับคำสั่งต่อhtml*/
    let ftList = document.getElementById("ft_list");/*ftList ใช้เก้บจัดการข้อมุลผู้ใช้ที่เพิ่มมา*/
    let todos = getTodos();

    function setTodos() { /*เก็บข้อมุล todo ในคุกกี้*/
        document.cookie = "todos=" + JSON.stringify(todos) + "; path=/";
    }

    function getTodos() { /*ดึงรายการลิสทูดูที่บันทึกในคุกกี้*/
        let cookies = document.cookie.split("; ").find(row => row.startsWith("todos="));
        return cookies ? JSON.parse(cookies.split("=")[1]) : []; /*จากjs string เป็นjs array*/
    }

    function addTodo(text) { 
        let div = document.createElement("div");
        div.className = "todo";
        div.textContent = text;
        div.onclick = () => { /*การกด todo ลิสจะมีการถามว่าลบจีงเป่า? */
            if (confirm("Do you want to remove this TO DO?")) {
                todos = todos.filter(t => t !== text);/*จะคัด todo ที่กดออก */
                div.remove(); /*ลบ*/
                setTodos(); /*อัพเดทหน้าล่าสุด todo*/
            }
        };
        ftList.prepend(div);/*todo ที่ถุกพิมเพิ่มจะเพิ่มด้านบน ถ้าจะให้เพิ่มด้านล่างก้ ใส่ append() แทน */
    }

    document.querySelector("button").onclick = () => { /*รันจาก html(line36)*/
        let task = prompt("Enter a new TO DO:"); /*กล่องข้อความพิมต้อกแต้ก*/
        if (task) { 
            todos.push(task);/*เพิ่มข้อมุลที่พิมไปในรายการ todo*/
            addTodo(task);/*เพิ่ม todo หน้าเว้บ*/
            setTodos();/*บันทึกข้อมุล todo ในคุกกี้*/
        }
    };

    todos.forEach(addTodo);/*เอา todo แต่ละอันมาแสดงหน้าต่างเว้บ*/
});
