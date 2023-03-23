import React from "react";
import "./Categories.scss";

const Categories = (props) => {
  const selectCategory = (categoryType) => {
    props.filter(categoryType);
  };

  return (
    <div className="app__categories app__flex">
      <div className="app__categories-list">
        <p
          className={` ${props.active === 0 ? "active" : ""} category-pill`}
          onClick={() => selectCategory(0)}
        >
          All
        </p>
        {props.categories.map((category) => (
          <p
            onClick={() => selectCategory(category)}
            className={` ${
              category.category_id === props.active ? "active" : ""
            } category-pill`}
            key={category.category_id}
          >
            {category.category_name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Categories;
