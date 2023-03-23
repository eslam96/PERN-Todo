import "./TodoListItem.scss";
import { HiTrash } from "react-icons/hi";
import { BsCircle, BsCheckCircleFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

const TodoListItem = (props) => {
  const deleteCurrentTask = async () => {
    try {
      const deleteTask = await fetch(
        `http://localhost:5000/todos/${props.task.id}`,
        {
          method: "DELETE",
        }
      );
      props.updateTodo();
    } catch (err) {
      console.log(err.message);
    }
  };

  const checkTask = async (isChecked) => {
    console.log(isChecked);
    try {
      const body = { task_done: isChecked };
      const updateTaskIsDone = await fetch(
        `http://localhost:5000/todos/${props.task.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      props.updateTodo();
    } catch (err) {
      console.log(err.message);
    }
    // props.checkTask(props.task.id, isChecked);
  };

  return (
    <div className="app__list-item app__flex">
      <div className="app__list-item_content">
        {props.task.checked ? (
          <BsCheckCircleFill
            className="circle checked"
            onClick={() => {
              checkTask(false);
            }}
          />
        ) : (
          <BsCircle
            className="circle unchecked"
            onClick={() => {
              checkTask(true);
            }}
          />
        )}
        <p className={props.task.checked ? "checked" : ""}>
          {props.task.content}
        </p>
      </div>
      <div className="app__list-item_options">
        <div className="list__item-edit option">
          <MdEdit />
          <span>Edit</span>
        </div>
        <div className="list__item-delete option" onClick={deleteCurrentTask}>
          <HiTrash />
          <span>Delete</span>
        </div>
      </div>
    </div>
  );
};

export default TodoListItem;
