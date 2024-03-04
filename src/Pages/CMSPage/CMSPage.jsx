import React, { useContext, useState, useEffect, useLayoutEffect } from "react";

import classes from "./CMSPage.module.scss";

import TableVacancyse from "../../Components/CompCMSPage/TableVacancyse/TableVacancyse";
import TableApplications from "../../Components/CompCMSPage/TableApplications/TableApplications";
import Popup from "../../Components/CompCMSPage/Popup/Popup";
import Header from "../../Components/CompCMSPage/Header/Header";

const CMSPage = () => {
  return (
    <div className={classes.cms}>
      <Header />
      <Popup />
      <div className="_cont_limit">
        <div className={classes.cms_body}>
          <TableVacancyse />
          <TableApplications />
        </div>
      </div>
    </div>
  );
};

export default CMSPage;
