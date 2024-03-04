import React, { useRef } from "react";
import classes from "./Loader.module.scss";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  banner,
  textAnimation,
  logoBlockAnimation,
  logoAnimation,
  logoBlockAnimation2,
} from "./loaderAnimation";
import { useResize } from "../../../customHooks/use-resize";

const Loader = () => {
  const conteiner = useRef(null);
  const withWindow = useResize();
  const { scrollYProgress } = useScroll({
    target: conteiner,
    offset: ["start start", "end end"],
  });
  const y_scroll = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <div className={classes.loader}>
      <motion.div
        className={classes.loader_bg}
        style={{ y: y_scroll }}
      ></motion.div>
      <div className="_cont_limit">
        <div className={classes.loader_body}>
          <motion.div
            className={classes.loader_column}
            variants={banner}
            initial="initial"
            animate="animate"
          >
            <div>
              <div className={classes.row_top}>
                {withWindow.SCREEN_XXL ? (
                  <AnimatedTitle title={"станьте частью"} />
                ) : (
                  <>
                    <AnimatedTitle title={"станьте"} />
                    <AnimatedTitle title={"частью"} />
                  </>
                )}
              </div>
              <div className={classes.row_mid}>
                <AnimatedTitle title={"команды"} />
              </div>
              <div className={classes.row_bot}>
                {withWindow.SCREEN_XXL ? (
                  <motion.div
                    className={classes.blok_logo}
                    variants={logoBlockAnimation}
                    initial="initial"
                    animate="animate"
                  >
                    <motion.img
                      variants={logoAnimation}
                      initial="initial"
                      animate="animate"
                      src={process.env.PUBLIC_URL + "/images/logoOnlyStar.svg"}
                      alt="logo"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    className={classes.blok_logo}
                    variants={logoBlockAnimation2}
                    initial="initial"
                    animate="animate"
                  >
                    <motion.img
                      variants={logoAnimation}
                      initial="initial"
                      animate="animate"
                      src={process.env.PUBLIC_URL + "/images/logoOnlyStar.svg"}
                      alt="logo"
                    />
                  </motion.div>
                )}
                <AnimatedTitle
                  title={
                    <img
                      src={
                        process.env.PUBLIC_URL + "/images/logoWithoutStar.svg"
                      }
                      alt="logo"
                    />
                  }
                />
              </div>
            </div>
            <div className={classes.block_subtitle}>
              <AnimatedSubTitle sub_title={"Присоединяйтесь к нам и"} />
              <AnimatedSubTitle sub_title={"создавайте будущее вместе!"} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
const AnimatedTitle = ({ title }) => (
  <div className={classes.row_block}>
    <motion.span variants={textAnimation} className={classes.row_title}>
      {title}
    </motion.span>
  </div>
);
const AnimatedSubTitle = ({ sub_title }) => (
  <div className={classes.row_block}>
    <motion.span variants={textAnimation} className={classes.row_subtitle}>
      {sub_title}
    </motion.span>
  </div>
);

export default Loader;
