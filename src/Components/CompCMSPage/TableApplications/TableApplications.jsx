import React, { useContext, useState, useEffect } from "react";
import classes from "./TableApplications.module.scss";
import { observer } from "mobx-react-lite";
import { Context } from "../../..";
import { Checkbox } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SetApplicationStatus } from "../../../config/FireBaseApplications";
import SpinLoader from "../../SpinLoader/SpinLoader";

const theme1 = createTheme({
  palette: {
    ochre: {
      main: "#000000",
    },
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: "Montserrat, sans-serif",
    fontSize: 13,
  },
});

const TableApplications = observer(() => {
  const { isOpenPopupCMS, dataApplFromServer, statusOpenAllPopup } =
    useContext(Context);
  //Запрос на изъятия данных
  useEffect(() => {
    const getVacData = async () => {
      await dataApplFromServer.getFromFirebase();
      setApplicationsList(dataApplFromServer.listApplications);
      setIsLoad(false);
    };
    if (!dataApplFromServer.listApplications.length) {
      getVacData();
    }
  }, [dataApplFromServer.listApplications]);
  const [applicationsList, setApplicationsList] = useState([]);
  const [isLoad, setIsLoad] = useState(true);

  //Запрос на удаление данных
  const delVac = async (data) => {
    statusOpenAllPopup.setIsOpen(true);
    isOpenPopupCMS.setIsOpen(true);
    isOpenPopupCMS.setDelData(true);
    isOpenPopupCMS.setDelDataAppl(true);
    isOpenPopupCMS.setData(data);
  };
  return (
    <>
      <div className={classes.table_title}>
        <div className={classes.title}>Все доступные заявки</div>
      </div>
      <div className={classes.conteiner_applications}>
        <HeaderVacancy />
        {isLoad && <SpinLoader title={""} />}
        {!isLoad && !applicationsList.length && (
          <div className={classes.messenge_clear}>Сободных вакансий нет</div>
        )}
        {applicationsList.map((item, index) => (
          <RowVacancy
            vac={item}
            key={index}
            index={index + 1}
            delVac={delVac}
          />
        ))}
      </div>
    </>
  );
});
const HeaderVacancy = () => (
  <div className={`${classes.row} ${classes.row_header}`}>
    <div className={classes.item}>
      <div className={classes.item_title}>Номер</div>
    </div>
    <div className={classes.item}>
      <div className={classes.item_title}>Имя</div>
    </div>
    <div className={classes.item}>
      <div className={classes.item_title}>Фамилия</div>
    </div>
    <div className={classes.item}>
      <div className={classes.item_title}>Должность</div>
    </div>
    <div className={classes.item}>
      <div className={classes.item_title}>Номер</div>
    </div>
    <div className={classes.item}>
      <div className={classes.item_title}>Резюме</div>
    </div>
    <div className={classes.item}>
      <div className={classes.item_title}>Просмотрено</div>
    </div>
    <div className={classes.item}>
      <div className={classes.item_title}>Действия</div>
    </div>
  </div>
);
const RowVacancy = ({ vac, index, delVac }) => {
  const [checked, setChecked] = useState(vac.isOpen);
  const handleChange = (event) => {
    setChecked(event.target.checked);
    SetApplicationStatus(vac, event.target.checked);
  };

  return (
    <div className={classes.row}>
      <div className={`${classes.item} ${classes.center}`}>
        <div className={classes.item_text}>{index}</div>
      </div>
      <div className={`${classes.item} ${classes.center}`}>
        <div className={classes.item_text}>{vac.firstName}</div>
      </div>
      <div className={`${classes.item} ${classes.center}`}>
        <div className={classes.item_text}>{vac.lastName}</div>
      </div>
      <div className={`${classes.item} ${classes.center}`}>
        <div className={classes.item_text}>{vac.job}</div>
      </div>
      <div className={`${classes.item} ${classes.center}`}>
        <div className={classes.item_text}>{vac.phoneNumber}</div>
      </div>
      <div className={`${classes.item} ${classes.center}`}>
        {vac.file == null || vac.file == "Не прикреплено" ? (
          "Не прикреплено"
        ) : (
          <button>
            <a target="_blank" href={vac.file}>
              Открыть
            </a>
          </button>
        )}
      </div>
      <div className={`${classes.item} ${classes.center}`}>
        <ThemeProvider theme={theme1}>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            color="ochre"
          />
        </ThemeProvider>
      </div>
      <div className={`${classes.item} ${classes.center}`}>
        <button onClick={() => delVac(vac)}> Удалить</button>
      </div>
    </div>
  );
};

export default TableApplications;
