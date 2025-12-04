// tässä tallennus avain local storageen
const STORAGE_KEY = "todo-items";

let todos = [];

// kun DOM valmis
$(document).ready(function () {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    todos = JSON.parse(saved);
    renderTodos();
  }
});

// lomakkeen käsittely
$("#todo-form").on("submit", function (e) {
  e.preventDefault();
  const text = $("#todo-input").val().trim();

  if (text.length < 3) {
    showError("Tehtävän on oltava vähintään 3 merkkiä pitkä.");
    $("#todo-input").addClass("error");
    return;
  }

  const todo = { id: Date.now(), text, done: false };
  todos.push(todo);

  $("#todo-input").val("");
  $("#todo-input").removeClass("error");
  $("#error-message").text("");

  saveTodos();
  renderTodos();
});

// virhe ilmoitus
function showError(message) {
  $("#error-message").text(message);
}

// listan renderöinti
function renderTodos() {
  const list = $("#todo-list");
  list.empty();

  todos.forEach((todo) => {
    const li = $("<li>")
      .addClass(todo.done ? "done" : "")
      .addClass("animate__animated animate__fadeIn");

    const span = $("<span>")
      .text(todo.text)
      .on("click", () => toggleDone(todo.id));

    const btn = $("<button>")
      .text("Poista")
      .on("click", () => deleteTodo(todo.id));

    li.append(span, btn);
    list.append(li);
    // lisäsin animaation
    li.css({ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 });
    list.append(li);
    li.animate(
  {
    height: "40px",
    opacity: 1,
    paddingTop: "10px",
    paddingBottom: "10px"
  },
  300
);
  });
}

// merkitsee tehtävän tehdyksi 
function toggleDone(id) {
  todos = todos.map((t) =>
    t.id === id ? { ...t, done: !t.done } : t
  );

  saveTodos();
  renderTodos();
}

// poistaa tehtävän
function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);

  saveTodos();
  renderTodos();
}

// tallennus localstorageen
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
