import React from "react";
import classes from "./footer.module.scss";
import { FaInstagram } from "react-icons/fa";
import { TbBrandTiktok } from "react-icons/tb";
import { FiYoutube } from "react-icons/fi";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className="_cont_limit">
        <div className={classes.body}>
          <div className={classes.item}>
            <a href="https://www.zeta.kz/about_us/">О нас</a>
          </div>
          <div className={classes.item}>
            <a href="https://www.zeta.kz/our_stores/">Магазины</a>
          </div>
          <div className={classes.item}>
            <div className={classes.contacts}>Телефоны:</div>
            <div>
              <div className={classes.contacts}>
                <a href="tel:+77077888423">+7 (707) 788-84-23</a>
              </div>
              <div className={classes.contacts}>
                <a href="tel:+77474834922">+7 (747) 483-49-22</a>
              </div>
            </div>
          </div>
          <div className={classes.item}>
            <div className={classes.contacts}>
              <a href="mailto:e.nureeva@zeta.kz">e.nureeva@zeta.kz</a>
            </div>
          </div>
          <div className={`${classes.item} ${classes.item_icon}`}>
            <div className={classes.icon}>
              <a href="https://www.instagram.com/zeta.kz/">
                <FaInstagram />
              </a>
            </div>
            <div className={classes.icon}>
              <a href="https://www.tiktok.com/@zeta_kz">
                <TbBrandTiktok />
              </a>
            </div>
            <div className={classes.icon}>
              <a href="https://www.youtube.com/@zeta_kz">
                <FiYoutube />
              </a>
            </div>
          </div>

          <div className={classes.item}>
            <a href="https://t.me/Gloomycatt">devoloped by NasYrov</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
