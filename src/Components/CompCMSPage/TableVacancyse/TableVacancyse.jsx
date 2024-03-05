import React, { useContext, useState, useEffect } from "react";
import classes from "./TableVacancyse.module.scss";
import { observer } from "mobx-react-lite";
import { Context } from "../../..";
import SpinLoader from "../../SpinLoader/SpinLoader";
import { addSpacesToPrice } from "../../../functions/addSpacesToPrice";
import { filterList } from "../../../functions/filterList";
import FilterButton from "../FilterButton/FilterButton";

const listHeader = [
  "Номер",
  "Дата",
  "Должность",
  "Место",
  "ЗП",
  "Обязонности",
  "Условия",
  "Действия",
];
const listButtonFilter = [
  { date: "По дате" },
  { name: "По должности" },
  { place: "По месту" },
  { price: "По ЗП" },
];

const TableVacancyse = observer(() => {
  const { isOpenPopupCMS, dataVacFromServer } = useContext(Context);
  //Запрос на изъятия данных
  useEffect(() => {
    const getVacData = async () => {
      await dataVacFromServer.getFromFirebase();
      setIsLoad(false);
    };
    if (!dataVacFromServer.listVacancies.length) {
      getVacData();
    }
    setVacanciesList(dataVacFromServer.listVacancies);
  }, [dataVacFromServer.listVacancies]);

  const [vacanciesList, setVacanciesList] = useState([]);
  const [isLoad, setIsLoad] = useState(true);

  //Запрос на удаление данных
  const delVac = async (data) => {
    isOpenPopupCMS.setIsOpen(true);
    isOpenPopupCMS.setDelData(true);
    isOpenPopupCMS.setDelDataVac(true);
    isOpenPopupCMS.setData(data);
  };

  //открытие окна для добавления или изменения вакансий
  const openPopup = (vac) => {
    isOpenPopupCMS.setIsOpen(true);
    isOpenPopupCMS.setChangeDataVac(true);
    isOpenPopupCMS.setData(vac);
  };

  //фильтрация списка по нажатию

  const [atributFilter, setAtributFilter] = useState("date");
  const filterVacancies = (atribut) => {
    setAtributFilter(atribut);
    setVacanciesList(
      filterList(dataVacFromServer.listVacancies.slice(), atribut)
    );
  };
  return (
    <>
      <div className={classes.table_title}>
        <div className={classes.title}>Все доступные вакансии</div>
        <div className={classes.but}>
          <button onClick={() => openPopup(null)}>Добавить вакансию</button>
        </div>
      </div>
      <FilterButton
        list_button={listButtonFilter}
        filter_function={filterVacancies}
        atributFilter={atributFilter}
      />
      <div className={classes.conteiner_vacansii}>
        <div className={`${classes.row} ${classes.row_header}`}>
          {listHeader.map((item, index) => (
            <div key={index} className={classes.item}>
              <div className={classes.item_title}>{item}</div>
            </div>
          ))}
        </div>
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
      <div className={classes.item_text}>
        {new Date(vac.date.seconds * 1000).toLocaleDateString()}
      </div>
    </div>
    <div className={`${classes.item} ${classes.center}`}>
      <div className={classes.item_text}>{vac.name}</div>
    </div>
    <div className={`${classes.item} ${classes.center}`}>
      <div className={classes.item_text}>{vac.place}</div>
    </div>
    <div className={`${classes.item} ${classes.center}`}>
      <div className={classes.item_text}>{addSpacesToPrice(vac.price)} ₸</div>
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

export default TableVacancyse;
