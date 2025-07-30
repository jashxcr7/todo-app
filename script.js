// Load saved tasks on page load
window.onload = function () {
  loadTasks();
};

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  const task = {
    text: taskText,
    completed: false,
  };

  // Add to UI
  createTaskElement(task);

  // Save to storage
  saveTaskToStorage(task);

  taskInput.value = "";
}

function createTaskElement(task) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = task.text;
  span.onclick = function () {
    span.classList.toggle("completed");
    task.completed = span.classList.contains("completed");
    updateTasksInStorage();
  };

  if (task.completed) {
    span.classList.add("completed");
  }

  const button = document.createElement("button");
  button.textContent = "❌";
  button.onclick = function () {
    li.remove();
    removeTaskFromStorage(task.text);
  };

  li.appendChild(span);
  li.appendChild(button);
  document.getElementById("taskList").appendChild(li);
}

function saveTaskToStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((t) => t.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTasksInStorage() {
  const listItems = document.querySelectorAll("#taskList li span");
  let tasks = [];
  listItems.forEach((item) => {
    tasks.push({
      text: item.textContent,
      completed: item.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    createTaskElement(task);
  });
}
