import React, { useContext, useState, useEffect } from "react";
import classes from "./listVacancies.module.scss";
import Form from "./Form/Form";
import { useResize } from "../../../customHooks/use-resize";
import { motion, AnimatePresence, useCycle } from "framer-motion";
import PopupInfoVac from "../../PopupInfoVac/PopupInfoVac";
import { observer } from "mobx-react-lite";
import { Context } from "../../..";

const ListVacancies = observer(() => {
  const { dataVacFromServer } = useContext(Context);
  const widthWindow = useResize();
  const [isOpen, setIsOpen] = useCycle(false, true);
  const [vacanciesList, setVacanciesList] = useState([]);
  const [indexVac, setIndexVac] = useState(null);
  const [indexItem, setIndexItem] = useState("");

  //запрос на сервер
  useEffect(() => {
    const getVacData = async () => {
      await dataVacFromServer.getFromFirebase();
    };
    if (!dataVacFromServer.listVacancies.length) {
      getVacData();
    } else {
      setIndexItem(dataVacFromServer.listVacancies[0].id);
      setIndexVac(dataVacFromServer.listVacancies[0]);
      setVacanciesList(dataVacFromServer.listVacancies);
      dataVacFromServer.setIsLoadFromServer(true);
    }
  }, [dataVacFromServer.listVacancies]);

  //смена айдишника для отображения полной информации о вакансии
  const changeVac = (id) => {
    setIndexItem(id);
    let newItem = vacanciesList.filter((item) => item.id === id);
    setIndexVac(newItem[0]);
    setIsOpen();
  };

  return (
    <>
      <PopupInfoVac
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        indexVac={indexVac}
        widthWindow={widthWindow.SCREEN_LG}
      />

      <div className={classes.vac}>
        <div className="_cont_limit">
          <div className={classes.vac_body}>
            {widthWindow.SCREEN_LG && <InfoVac indexVac={indexVac} />}

            <div className={classes.vac_column}>
              <span className={classes.title}>
                Мы предлагаем большой выбор специальностей
              </span>
              {dataVacFromServer.isLoadFromServer ? (
                <div className={classes.wrapper_item}>
                  {vacanciesList.map((item) => (
                    <DestroyListVac
                      key={item.id}
                      name={item.name}
                      place={item.place}
                      id={item.id}
                      changeVac={changeVac}
                      indexItem={indexItem}
                      widthWindow={widthWindow}
                    />
                  ))}
                </div>
              ) : (
                <div className={classes.spin_loader}>
                  <img
                    src={process.env.PUBLIC_URL + "/images/logoOnlyStar.svg"}
                    alt="logoOnlyStar"
                  />
                </div>
              )}

              <Form
                widthWindow={widthWindow.SCREEN_SM}
                vacanciesList={vacanciesList}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
//подробная информация о вакансии
const InfoVac = ({ indexVac }) => (
  <div className={`${classes.vac_column} ${classes.info_column}`}>
    {indexVac && (
      <div className={classes.info_column}>
        <div className={classes.left_title}>{indexVac.name}</div>
        <div className={classes.left_title}>{indexVac.place}</div>
        <div className={classes.left_title}>от {indexVac.price} тг</div>
        <DiscrptionInfoVac
          title={"Обязанности"}
          text={indexVac.responsibilities}
        />
        <DiscrptionInfoVac title={"Условия"} text={indexVac.conditions} />
      </div>
    )}
  </div>
);
//информация о обязанностях и требования
const DiscrptionInfoVac = ({ title, text }) => (
  <div className={classes.left_item}>
    <div className={classes.item_title}>{title}</div>
    <div className={classes.item_subtitle}>
      <ul>
        {text.split(";").map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
);

//список вакансий

const DestroyListVac = ({
  name,
  place,
  id,
  changeVac,
  indexItem,
  widthWindow,
}) => (
  <div key={id} className={classes.item} onClick={() => changeVac(id)}>
    <span className={classes.item_text}>{`${name} (${place})`}</span>
    <span
      className={`${classes.item_button} ${
        indexItem === id && widthWindow.SCREEN_LG && classes.button_active
      }`}
    >
      +
    </span>
    <AnimatePresence>
      {indexItem === id && widthWindow.SCREEN_LG && (
        <motion.div
          key={id}
          initial={{ width: 0 }}
          animate={{
            width: "100%",
            transition: {
              ease: [0.6, 0.01, -0.05, 0.95],
              duration: 1,
            },
          }}
          exit={{
            width: 0,
            transition: {
              ease: [0.6, 0.01, -0.05, 0.95],
              duration: 0.6,
            },
          }}
          className={classes.item_bg}
        ></motion.div>
      )}
    </AnimatePresence>
  </div>
);
export default ListVacancies;
