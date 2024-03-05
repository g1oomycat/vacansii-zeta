import React from "react";
import classes from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase";

const Header = () => {
  const navigate = useNavigate();
  const userLogout = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate("/authorization");
  };
  return (
    <div className={classes.header}>
      <div className="_cont_limit">
        <div className={classes.heder_body}>
          <div>
            <Link to={"/"}>
              <button>Сайт вакансии</button>
            </Link>
          </div>
          <div className={classes.menu_list}>
            <div className={classes.name}>
              По всем вопросам писать на WhatsApp +77074067798
            </div>
            <div className={classes.name}>Beta-Version 0.2</div>
            <button onClick={userLogout}>Выйти</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
