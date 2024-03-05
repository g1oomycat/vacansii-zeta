import React from "react";
import classes from "./filterButton.module.scss";

const FilterButton = ({ list_button, filter_function, atributFilter }) => {
  return (
    <div className={classes.filter_button}>
      {list_button.map((product, index) => (
        <button
          className={
            atributFilter === Object.keys(product)[0]
              ? classes.active_filter
              : undefined
          }
          onClick={() => filter_function(Object.keys(product)[0])}
          key={index}
        >
          {Object.values(product)}
        </button>
      ))}
    </div>
  );
};

export default FilterButton;
