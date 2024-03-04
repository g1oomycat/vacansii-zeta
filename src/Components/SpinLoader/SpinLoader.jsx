import React from "react";
import classes from "./spinLoader.module.scss";

const SpinLoader = ({ title }) => {
  return (
    <div className={classes.message_load}>
      {title && <div className={classes.title_load}>{title}</div>}
      <div className={classes.spin_load} style={{ margin: !title && "2rem" }}>
        <img
          src={process.env.PUBLIC_URL + "/images/logoOnlyStar.svg"}
          alt="logoOnlyStar"
        />
      </div>
    </div>
  );
};

export default SpinLoader;
