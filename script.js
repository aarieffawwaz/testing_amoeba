const STORAGE_KEY = "todos";

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const empty = document.getElementById("empty");

let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function render() {
  list.innerHTML = "";
  todos.forEach((todo, i) => {
    const li = document.createElement("li");
    if (todo.done) li.classList.add("done");

    const text = document.createElement("span");
    text.textContent = todo.text;
    text.addEventListener("click", () => {
      todos[i].done = !todos[i].done;
      save();
      render();
    });

    const del = document.createElement("button");
    del.textContent = "Hapus";
    del.addEventListener("click", () => {
      todos.splice(i, 1);
      save();
      render();
    });

    li.append(text, del);
    list.appendChild(li);
  });
  empty.hidden = todos.length > 0;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ text, done: false });
  input.value = "";
  save();
  render();
});

render();
