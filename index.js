document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");
    const noTasksMessage = document.getElementById("noTasksMessage");
    const clearTasksButton = document.getElementById("clearTasksButton");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = task.completed ? "completed" : "";
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? "checked" : ""} data-index="${index}">
                ${task.text}
                <button class="deleteButton" data-index="${index}">Удалить</button>
            `;
            taskList.appendChild(li);
        });

        if (tasks.length === 0) {
            noTasksMessage.classList.remove("hidden");
            clearTasksButton.classList.add("hidden");
        } else {
            noTasksMessage.classList.add("hidden");
            clearTasksButton.classList.remove("hidden");
        }
    }

    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = "";
            saveTasks();
            renderTasks();
        }
    });

    taskList.addEventListener("click", (event) => {
        if (event.target.type === "checkbox") {
            const index = event.target.dataset.index;
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        } else if (event.target.classList.contains("deleteButton")) {
            const index = event.target.dataset.index;
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }
    });

    clearTasksButton.addEventListener("click", () => {
        tasks = [];
        saveTasks();
        renderTasks();
    });

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    renderTasks();
});