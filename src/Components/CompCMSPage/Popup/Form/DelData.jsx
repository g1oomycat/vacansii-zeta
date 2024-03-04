import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import classes from "../Popup.module.scss";
import { Context } from "../../../..";
import { DelVacanciesList } from "../../../../config/FireBaseVacancies";
import {
  DelApplicationsList,
  DelApplicationsFile,
} from "../../../../config/FireBaseApplications";

const DelData = observer(({ closedPopup }) => {
  const { isOpenPopupCMS, dataVacFromServer, dataApplFromServer } =
    useContext(Context);

  const delVac = async () => {
    isOpenPopupCMS.setIsSend(true);
    if (isOpenPopupCMS.delDataVac) {
      await DelVacanciesList(isOpenPopupCMS.data.id);
      await dataVacFromServer.getFromFirebase();
    }
    if (isOpenPopupCMS.delDataAppl) {
      await DelApplicationsList(isOpenPopupCMS.data.id);
      if (isOpenPopupCMS.data.file) {
        await DelApplicationsFile(isOpenPopupCMS.data.file);
      }
      await dataApplFromServer.getFromFirebase();
    }

    closedPopup();
  };

  return (
    <div className={classes.delete_messenge}>
      {isOpenPopupCMS.delDataVac && (
        <div className={classes.title_del}>
          Вы точно хотите удалить ВАКАНСИЮ?
        </div>
      )}
      {isOpenPopupCMS.delDataAppl && (
        <div className={classes.title_del}>Вы точно хотите удалить ЗАЯВКУ?</div>
      )}

      <div className={classes.del_button}>
        <button onClick={delVac}>Удалить</button>
        <button onClick={closedPopup}>Отменить</button>
      </div>
    </div>
  );
});

export default DelData;
