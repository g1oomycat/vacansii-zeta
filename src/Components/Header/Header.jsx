import React from "react";
import classes from "./header.module.scss";
import { motion } from "framer-motion";
export const headertAnimation = {
  initial: { y: "-100%" },
  animate: {
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 0.7,
      delay: 1.5,
    },
  },
};

const Header = () => {
  return (
    <motion.header
      className={classes.header}
      variants={headertAnimation}
      initial="initial"
      animate="animate"
    >
      <div className="_cont_limit">
        <div className={classes.heder_body}>
          <div className={classes.logo}>
            <img
              src={process.env.PUBLIC_URL + "/images/logoWithStar.svg"}
              alt="logo"
            />
          </div>
          <div className={classes.menu_list}>
            <span className={classes.menu_item}>
              <a href="https://www.zeta.kz/about_us/">О нас</a>
            </span>
            <span className={classes.menu_item}>
              <a href="https://www.zeta.kz/our_stores/">Магазины</a>
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
