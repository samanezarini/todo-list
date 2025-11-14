const input = document.getElementById("input-text-task");
const addBtn = document.getElementById("btn-add");
const taskList = document.getElementById("task-box");
const filters = document.querySelectorAll("[data-filter]");

document.body.appendChild(taskList);

addBtn.addEventListener("click", () => {
  const taskText = input.value.trim();
  if (taskText === "") return;

  //new task
  const taskDiv = document.createElement("div");
  taskDiv.classList.add(
    "flex",
    "items-center",
    "justify-between",
    "border",
    "border-gray-200",
    "rounded-4xl",
    "px-3",
    "py-2",
    "mt-2",
    "mb-2",
    "w-[30rem]",
    "gap-3",
    "cursor"
  );

  taskList.classList.add("flex", "flex-col", "gap-3");


  // text-task
  const taskP = document.createElement("p");
  taskP.textContent = taskText;
  taskP.classList.add("text-gray-800");

  // btn-delete
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = `  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-trash2-icon lucide-trash-2 mt-1"
                >
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                  <path d="M3 6h18" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>`;
  deleteBtn.classList.add("ml-2", "text-xl");

  // btn-edit
  const editBtn = document.createElement("button");
  editBtn.innerHTML = `<svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-square-pen-icon lucide-square-pen mt-1"
                >
                  <path
                    d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                  />
                  <path
                    d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
                  />
                </svg>`;
  editBtn.classList.add("ml-3", "text-xl");

  // checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("cursor-pointer", "mr-2");

  // add elements
  const left = document.createElement("div");
  left.classList.add("flex", "items-center");
  left.appendChild(checkbox);
  left.appendChild(taskP);

  const right = document.createElement("div");
  right.appendChild(deleteBtn);
  right.appendChild(editBtn);

  taskDiv.appendChild(left);
  taskDiv.appendChild(right);
  taskList.appendChild(taskDiv);

  // input-delete
  input.value = "";

  // events checkbox 
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      taskP.classList.add("line-through", "text-gray-400");
    } else {
      taskP.classList.remove("line-through", "text-gray-400");
    }

  });


  deleteBtn.addEventListener("click", () => {
    taskDiv.remove();
  });

  editBtn.addEventListener("click", () => {
    const newText = prompt("Edit your task:", taskP.textContent);
    if (newText) taskP.textContent = newText;
  });
});

// // filter tasks

// filters.forEach(btn => {
//   btn.addEventListener("click", () => {
//     const type = btn.dataset.filter.toLowerCase();

//     [...taskList.children].forEach(task => {
//       const done = task.dataset.completed === "true";

//       if (type === "all") task.style.display = "flex";
//       if (type === "completed") task.style.display = done ? "flex" : "none";
//       if (type === "not-completed") task.style.display = !done ? "flex" : "none";
//     });
//   });
// });
