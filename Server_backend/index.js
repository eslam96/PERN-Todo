const experss = require("express");
const app = experss();
const cors = require("cors");
const pool = require("./db");

//middlerware
app.use(cors());
app.use(experss.json());

//routes

//create a task

app.post("/todos", async (req, res) => {
  try {
    const { task_descreption, task_done, category_id } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo_list (task_description, task_done,category_id) VALUES ($1, $2,$3) RETURNING *",
      [task_descreption, task_done, category_id]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//get all tasks

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo_list");
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// get all categories

app.get("/categories", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM category");
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//get single task

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo_list where task_id=$1", [
      id,
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//update a single task

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task_description, task_done } = req.body;
    if (task_done === undefined) {
      // update task description

      const updateTodoDescription = await pool.query(
        "UPDATE todo_list SET task_description = $1 where task_id = $2",
        [task_description, id]
      );
      res.json("todo description was updated");
    } else {
      // update task isDone status

      const updateTodoIsDone = await pool.query(
        "UPDATE todo_list SET task_done = $1 where task_id = $2",
        [task_done, id]
      );
      res.json("todo IsDone was updated");
    }
  } catch (err) {
    console.log(err.message);
  }
});

//delete a task

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM todo_list WHERE task_id = $1",
      [id]
    );

    res.json("task was deleted");
  } catch (err) {
    console.log(err.message);
  }
});

// app server started on port 5000
app.listen(5000, () => {
  console.log("server has started on port 5000");
});
