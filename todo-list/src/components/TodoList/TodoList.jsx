import FoldItem from "../FoldItem/FoldItem";
import { useState } from "react";

import "./TodoList.scss";

const ToDoList = (props) => {
  const [incompleteToggle, setIncompleteToggle] = useState(true);
  const [completeToggle, setcompleteToggle] = useState(true);

  return (
    <div className="app__list">
      <div className="app__fold-container">
        <FoldItem
          id="Incomplete-tasks"
          stateString="Incomplete"
          isTaskChecked={false}
          toggleState={incompleteToggle}
          toggleFn={setIncompleteToggle}
          {...props}
        />
        <FoldItem
          id="completed-tasks"
          stateString="Complete"
          isTaskChecked={true}
          toggleState={completeToggle}
          toggleFn={setcompleteToggle}
          {...props}
        />
      </div>
    </div>
  );
};

export default ToDoList;
