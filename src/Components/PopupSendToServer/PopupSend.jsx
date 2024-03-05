import React, { useContext } from "react";
import classes from "./popupSend.module.scss";
import { observer } from "mobx-react-lite";
import { Context } from "../..";

import { GrClose } from "react-icons/gr";
import { motion, AnimatePresence } from "framer-motion";
import SpinLoader from "../SpinLoader/SpinLoader";

const animateCont = {
  initial: { opacity: 0, scale: 0.6 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.6,
    transition: {
      duration: 0.2,
    },
  },
};
const PopupSend = observer(() => {
  const { isOpenPopupServer } = useContext(Context);
  const closedPopup = () => {
    isOpenPopupServer.setIsOpen(false);
    isOpenPopupServer.setIsSend(false);
  };
  return (
    <AnimatePresence>
      {isOpenPopupServer.isOpen && (
        <div className={classes.popup}>
          <motion.div
            className={classes.conteiner}
            variants={animateCont}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className={classes.popup_body}>
              <span className={classes.button_exit} onClick={closedPopup}>
                <GrClose />
              </span>
              {isOpenPopupServer.isSend ? (
                <GreatMessange />
              ) : (
                <SpinLoader title={"Отправка заявки..."} />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

const GreatMessange = () => (
  <div className={classes.message}>
    <div className={classes.title}>ваша заявка принята!</div>
    <div className={classes.subtitle}>
      В ближайшее рабочее время с вами свяжуться наши сотрудники
    </div>

    <div className={classes.subtitle}>
      Если у вас возникли вопросы или вам требуется более подробная информация,
      пожалуйста, воспользуйтесь следующими контактными данными:
    </div>

    <div className={classes.row}>
      <div className={classes.subtitle}>Телефоны:</div>
      <div>
        <div className={classes.subtitle}>
          <a href="tel:+77077888423">+7 (707) 788-84-23</a>
        </div>
        <br />
        <div className={classes.subtitle}>
          {" "}
          <a href="tel:+77474834922">+7 (747) 483-49-22</a>
        </div>
      </div>
    </div>
    <div className={classes.row}>
      <div className={classes.subtitle}>Почта:</div>
      <div className={classes.subtitle}>
        <a href="mailto:e.nureeva@zeta.kz">e.nureeva@zeta.kz</a>
      </div>
    </div>
  </div>
);

export default PopupSend;
