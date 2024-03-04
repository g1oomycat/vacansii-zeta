import React from "react";
import classes from "./PopupInfoVac.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { GrClose } from "react-icons/gr";

export const PopupBlockAnimation = {
  initial: { y: "100%" },
  animate: {
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 0.7,
    },
  },
  exit: {
    y: "100%",
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 0.7,
    },
  },
};
const PopupInfoVac = ({ isOpen, setIsOpen, indexVac, widthWindow }) => {
  return (
    <AnimatePresence>
      {isOpen && !widthWindow && (
        <motion.div
          className={classes.popup}
          variants={PopupBlockAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className={classes.botton_exit} onClick={setIsOpen}>
            <GrClose />
          </div>
          <div className={classes.body}>
            <div className={classes.title}>{indexVac.name}</div>
            <div className={classes.title}>{indexVac.place}</div>
            <div className={classes.title}>от {indexVac.price} тг</div>
            <DiscrptionBlock
              title={"Обязанности"}
              text={indexVac.responsibilities}
            />
            <DiscrptionBlock title={"Условия"} text={indexVac.conditions} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const DiscrptionBlock = ({ title, text }) => (
  <div className={classes.discription}>
    <div className={classes.discription_title}>{title}</div>
    <div className={classes.discription_text}>
      <ul>
        {text.split(";").map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
);
export default PopupInfoVac;
