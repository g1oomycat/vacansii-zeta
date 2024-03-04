import React, { useContext, useState, useEffect } from "react";
import classes from "./TableVacancyse.module.scss";
import { observer } from "mobx-react-lite";
import { Context } from "../../..";
import SpinLoader from "../../SpinLoader/SpinLoader";

const TableVacancyse = observer(() => {
  const { isOpenPopupCMS, dataVacFromServer, statusOpenAllPopup } =
    useContext(Context);
  //Запрос на изъятия данных
  useEffect(() => {
    const getVacData = async () => {
      await dataVacFromServer.getFromFirebase();
      setVacanciesList(dataVacFromServer.listVacancies);
      setIsLoad(false);
    };
    if (!dataVacFromServer.listVacancies.length) {
      getVacData();
    }
  }, [dataVacFromServer.listVacancies]);

  const [vacanciesList, setVacanciesList] = useState([]);
  const [isLoad, setIsLoad] = useState(true);

  //Запрос на удаление данных
  const delVac = async (data) => {
    statusOpenAllPopup.setIsOpen(true);
    isOpenPopupCMS.setIsOpen(true);
    isOpenPopupCMS.setDelData(true);
    isOpenPopupCMS.setDelDataVac(true);
    isOpenPopupCMS.setData(data);
  };

  //открытие окна для добавления или изменения вакансий
  const openPopup = (vac) => {
    statusOpenAllPopup.setIsOpen(true);
    isOpenPopupCMS.setIsOpen(true);
    isOpenPopupCMS.setChangeDataVac(true);
    isOpenPopupCMS.setData(vac);
  };

  return (
    <>
      <div className={classes.table_title}>
        <div className={classes.title}>Все доступные вакансии</div>
        <div className={classes.but}>
          <button onClick={() => openPopup(null)}>Добавить вакансию</button>
        </div>
      </div>
      <div className={classes.conteiner_vacansii}>
        <HeaderVacancy />

        {isLoad && <SpinLoader title={""} />}
        {!isLoad && !vacanciesList.length && (
          <div className={classes.messenge_clear}>Сободных вакансий нет</div>
        )}
        {vacanciesList.map((item, index) => (
          <RowVacancy
            vac={item}
            key={index}
            index={index + 1}
            delVac={delVac}
            openPopup={openPopup}
          />
        ))}
      </div>
    </>
  );
});
const RowVacancy = ({ vac, index, delVac, openPopup }) => (
  <div className={classes.row}>
    <div className={`${classes.item} ${classes.center}`}>
      <div className={classes.item_text}>{index}</div>
    </div>
    <div className={`${classes.item} ${classes.center}`}>
      <div className={classes.item_text}>{vac.name}</div>
    </div>
    <div className={`${classes.item} ${classes.center}`}>
      <div className={classes.item_text}>{vac.place}</div>
    </div>
    <div className={`${classes.item} ${classes.center}`}>
      <div className={classes.item_text}>{vac.price} тг</div>
    </div>
    <div className={classes.item}>
      <div className={classes.item_text}>{vac.responsibilities}</div>
    </div>
    <div className={classes.item}>
      <div className={classes.item_text}>{vac.conditions}</div>
    </div>

    <div className={`${classes.item} ${classes.center}`}>
      <button onClick={() => openPopup(vac)}>Изменить</button>
      <button onClick={() => delVac(vac)}>Удалить</button>
    </div>
  </div>
);
const HeaderVacancy = () => (
  <div className={`${classes.row} ${classes.row_header}`}>
    <div className={classes.item}>
      <div className={classes.item_title}>Номер</div>
    </div>
    <div className={classes.item}>
      <div className={classes.item_title}>Должность</div>
    </div>
    <div className={classes.item}>
      <div className={classes.item_title}>Место</div>
    </div>
    <div className={classes.item}>
      <div className={classes.item_title}>ЗП</div>
    </div>
    <div className={classes.item}>
      <div className={classes.item_title}>Обязонности</div>
    </div>
    <div className={classes.item}>
      <div className={classes.item_title}>Условия</div>
    </div>
    <div className={classes.item}>
      <div className={classes.item_title}>Действия</div>
    </div>
  </div>
);
export default TableVacancyse;
