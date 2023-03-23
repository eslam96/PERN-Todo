import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { GoArrowUp } from "react-icons/go";
import { FaRegTimesCircle } from "react-icons/fa";
import "./AddTodoListItem.scss";

const AddTodoListItem = (props) => {
  // creating state items for task string and category
  const [taskString, settaskString] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCatID, setSelectedCatID] = useState(null);
  const [toggleCategories, setToggleCategories] = useState(false);
  const [enableAddBtn, setEnableAddBtn] = useState(false);

  // getting updated task string on input change
  const taskStringHandler = (event) => {
    settaskString(event.target.value);
    setEnableAddBtn(event.target.value !== "");
  };

  // getting updated task cateogry on select
  const taskCategoryHandler = (category) => {
    if (category.category_name !== "All") {
      setSelectedCategory(category.category_name);
      setSelectedCatID(category.category_id);
    }
    setToggleCategories(false);
  };

  // submit form handler creating task object and passing data through props to addNewTask
  const submitFormHandler = async (event) => {
    event.preventDefault();

    try {
      const body = {
        task_descreption: taskString,
        task_done: false,
        category_id: selectedCatID,
      };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.log(err.meassage);
    }

    settaskString("");
    setEnableAddBtn(false);
    props.updateTodo();
  };

  return (
    <motion.div
      className="addTask__form-container"
      whileInView={{ y: [3, 0], opacity: [0, 1] }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <form className="addTask__form" onSubmit={submitFormHandler}>
        <FaRegTimesCircle
          className="closeForm"
          onClick={() => props.closeForm(false)}
        />
        <input
          onChange={taskStringHandler}
          type="text"
          value={taskString}
          placeholder="Add new task here"
        />

        <div className="categories__list-container">
          <p
            className="categories__pill"
            onClick={() => setToggleCategories(!toggleCategories)}
          >
            {selectedCategory === "All" ? "No Category" : selectedCategory}
          </p>
          {toggleCategories && (
            <motion.div
              whileInView={{ y: [3, 0], opacity: [0, 1] }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="categories__list"
            >
              {props.categories.map((category) => {
                return (
                  <p
                    onClick={() => taskCategoryHandler(category)}
                    key={category.category_id}
                  >
                    {category.category_name}
                  </p>
                );
              })}
            </motion.div>
          )}
        </div>

        <button
          className={`${
            enableAddBtn ? "active" : "inActive"
          } addNewTask__button app__flex`}
          disabled={!enableAddBtn}
        >
          <GoArrowUp />
        </button>
      </form>
    </motion.div>
  );
};

export default AddTodoListItem;
