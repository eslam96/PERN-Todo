import TodoListItem from "../TodoListItem/TodoListItem";
import { Reorder, motion } from "framer-motion";

import {
  FaFolder,
  FaFolderOpen,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";

const FoldItem = (props) => {
  return (
    <div className="fold-item" id={props.id}>
      <div
        className="fold-header app__flex"
        onClick={() => props.toggleFn(!props.toggleState)}
      >
        {props.toggleState ? <FaFolderOpen /> : <FaFolder />}
        <p>{props.stateString}</p>
        <hr />
        {props.toggleState ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {props.toggleState && (
        <Reorder.Group
          axis="y"
          as="div"
          className="app__list-container"
          onReorder={props.setList}
          values={props.tasks}
        >
          {props.tasks.map((task) => (
            <Reorder.Item
              as="div"
              className="list-item"
              key={task.id}
              value={task}
            >
              {task.checked === props.isTaskChecked &&
                (props.activeCategory === 0 ||
                  task.category_id === props.activeCategory) && (
                  <TodoListItem
                    key={task.id}
                    task={task}
                    deleteTask={props.deleteTask}
                    checkTask={props.checkTask}
                    updateTodo={props.updateTodo}
                  />
                )}
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
    </div>
  );
};

export default FoldItem;
