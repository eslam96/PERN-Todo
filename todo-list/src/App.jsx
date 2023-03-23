import { useState, useEffect, useCallback } from "react";
import { AddTodoListItem, Categories, Todo_List } from "./components";
import { BsPlusLg } from "react-icons/bs";
import { motion } from "framer-motion";
import "./App.scss";

function App() {
  // state const holding all items existing
  const [TodoList, setTodoList] = useState([]);

  // state const holding existing categories list
  const [categories, setCategories] = useState([]);

  // state const holding form toggle state (true or false)
  const [toggleForm, setToggleForm] = useState(false);

  // state const for active category
  const [activeCategory, setActiveCategory] = useState(0);

  // adding new Task
  // const addNewTask = (task) => {
  //   setTodoList((prevTodoList) => {
  //     return [task, ...prevTodoList];
  //   });
  // };

  // change task status of checked or unchecked using id to define the task
  const changeTaskStatus = (id, isChecked) => {
    const UpdatedList = TodoList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked: isChecked,
        };
      }
      return item;
    });

    setTodoList(UpdatedList);
  };

  // deleting task using ID
  // const deleteExistingTask = (taskID) => {
  //   console.log("deleted task has ID : " + taskID);

  //   setTodoList((prevTodoList) => {
  //     console.log(prevTodoList);
  //     return prevTodoList.filter((item) => item.id !== taskID);
  //   });

  //   console.log(TodoList);
  // };

  // filter todo List by Category

  const filterByCategory = (category) => {
    setActiveCategory(category === 0 ? 0 : category.category_id);
  };

  // fetch todos from DB and store them into todoList state
  const fetchDataHandler = useCallback(async () => {
    try {
      const todoResponse = await fetch("http://localhost:5000/todos");

      const todoData = await todoResponse.json();

      const fetchedTodoList = todoData.map(
        ({ task_id, task_description, task_done, category_id }) => {
          return {
            id: task_id,
            content: task_description,
            checked: task_done,
            category_id,
          };
        }
      );

      setTodoList(fetchedTodoList);
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  // fetch stored categories from DB and store them into categories state
  const fetchCategoryHandler = useCallback(async () => {
    try {
      const categoriesResponse = await fetch(
        "http://localhost:5000/categories"
      );
      const categoryData = await categoriesResponse.json();
      const fetchedCategories = categoryData.map((item) => {
        return {
          category_id: item.id,
          category_name: item.category_name,
        };
      });
      setCategories(fetchedCategories);
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  useEffect(() => {
    fetchDataHandler();
    fetchCategoryHandler();
  }, [fetchDataHandler, fetchCategoryHandler]);

  return (
    <div className="App">
      <div className="list__container app__flex">
        <div className="list__body">
          <Categories
            categories={categories}
            active={activeCategory}
            filter={filterByCategory}
          />
          {toggleForm && (
            <AddTodoListItem
              closeForm={setToggleForm}
              categories={categories}
              updateTodo={fetchDataHandler}
            />
          )}
          <Todo_List
            tasks={TodoList}
            checkTask={changeTaskStatus}
            activeCategory={activeCategory}
            setList={setTodoList}
            updateTodo={fetchDataHandler}
          />
          {!toggleForm && (
            <motion.button
              onClick={() => setToggleForm(true)}
              className="showNewTaskForm__button app__flex"
              whileHover={{ scale: 1.2 }}
            >
              <BsPlusLg />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
