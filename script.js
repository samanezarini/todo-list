const input = document.getElementById("input-text-task");
const addBtn = document.getElementById("btn-add");
const taskList = document.getElementById("task-box");
const filters = document.querySelectorAll("[data-filter]");
const toggleThemeBtn = document.getElementById("toggle-theme-btn");
const darkSvg = `<svg   xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round" class="lucide lucide-moon-icon lucide-moon"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>`;
const lightSvg = `<svg   xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;


// toggle theme
toggleThemeBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  if (updateThemeIcon()) {
    toggleThemeBtn.innerHTML = lightSvg;
  } else {
    toggleThemeBtn.innerHTML = darkSvg;
  }
});

// set initial theme icon
function updateThemeIcon() {
  return document.documentElement.classList.contains("dark")
}

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
    "w-[22rem]",
    "md:w-[30rem]",
    "gap-3",
    "cursor",
    //animation add
    "opacity-0",
    "translate-y-3",
    "transition-all",
    "duration-300",
    //dark
    "bg-white",
    "border-gray-300",
    "dark:bg-[#0c120c]",
    "dark:border-gray-500",


  );


  taskList.classList.add("flex", "flex-col", "gap-3");

  // text-task
  const taskP = document.createElement("p");
  taskP.textContent = taskText;
  taskP.classList.add("text-gray-800", "dark:text-gray-200");
  taskDiv.dataset.completed = "false";


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
                  class="lucide text-gray-800 dark:text-gray-200 mt-1"
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
                  class="lucide text-gray-800 dark:text-gray-200 mt-1"
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
  requestAnimationFrame(() => {
    taskDiv.classList.remove("opacity-0", "translate-y-3");
  });

  // input-delete
  input.value = "";

  // events checkbox 
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      taskP.classList.add("line-through", "text-gray-400");
      taskDiv.dataset.completed = "true";

    } else {
      taskP.classList.remove("line-through", "text-gray-400");
      taskDiv.dataset.completed = "false";
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
function filterTasks(type) {
  const tasks = taskList.querySelectorAll("div[data-completed]");

  tasks.forEach(task => {
    const isDone = task.dataset.completed === "true";

    if (type === "all") task.style.display = "flex";
    if (type === "complet") task.style.display = isDone ? "flex" : "none";
    if (type === "not-complet") task.style.display = !isDone ? "flex" : "none";
  });
}

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.filter;
    filterTasks(type);
  });
});

