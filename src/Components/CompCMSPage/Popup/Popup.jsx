import React, { useContext } from "react";
import classes from "./Popup.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { GrClose } from "react-icons/gr";
import { observer } from "mobx-react-lite";
import { Context } from "../../..";
import AddVacancies from "./Form/AddVacancies";
import DelData from "./Form/DelData";
import SpinLoader from "../../SpinLoader/SpinLoader";

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

const Popup = observer(() => {
  const { isOpenPopupCMS } = useContext(Context);
  const closedPopup = () => {
    isOpenPopupCMS.setIsOpen(false);
    isOpenPopupCMS.setIsSend(false);
    isOpenPopupCMS.setData(null);
    isOpenPopupCMS.setDelData(false);
    isOpenPopupCMS.setDelDataAppl(false);
    isOpenPopupCMS.setDelDataVac(false);
    isOpenPopupCMS.setChangeDataVac(false);
  };
  return (
    <AnimatePresence>
      {isOpenPopupCMS.isOpen && (
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

              {isOpenPopupCMS.changeDataVac && !isOpenPopupCMS.isSend && (
                <AddVacancies closedPopup={closedPopup} />
              )}
              {isOpenPopupCMS.delData && !isOpenPopupCMS.isSend && (
                <DelData closedPopup={closedPopup} />
              )}

              {isOpenPopupCMS.isSend && (
                <SpinLoader title={"Изменение данных..."} />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

export default Popup;
