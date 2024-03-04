import React, { useContext } from "react";
import classes from "../Popup.module.scss";
import { TextField, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import { requiredValidation } from "../../../../validation/validation";
import { observer } from "mobx-react-lite";
import { Context } from "../../../..";
import {
  AddVacanciesList,
  SetVacanciesList,
} from "../../../../config/FireBaseVacancies";

const theme1 = createTheme({
  palette: {
    ochre: {
      main: "#000000",
    },
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: "Montserrat, sans-serif",
    fontSize: 17,
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "black",
          fontSize: 15,
        },
      },
    },
  },
});
const AddVacancies = observer(({ closedPopup }) => {
  const { isOpenPopupCMS, dataVacFromServer } = useContext(Context);

  const { handleSubmit, control } = useForm({
    mode: "onChange",
    defaultValues: {
      name: isOpenPopupCMS.data ? isOpenPopupCMS.data.name : "",
      place: isOpenPopupCMS.data ? isOpenPopupCMS.data.place : "",
      price: isOpenPopupCMS.data ? isOpenPopupCMS.data.price : "",
      responsibilities: isOpenPopupCMS.data
        ? isOpenPopupCMS.data.responsibilities
        : "",
      conditions: isOpenPopupCMS.data ? isOpenPopupCMS.data.conditions : "",
    },
  });
  const onSubmit = async (dataForm) => {
    isOpenPopupCMS.setIsSend(true);
    if (isOpenPopupCMS.data) {
      await SetVacanciesList(isOpenPopupCMS.data.id, dataForm);
    } else {
      await AddVacanciesList(dataForm);
    }
    await dataVacFromServer.getFromFirebase();
    closedPopup();
  };
  return (
    <ThemeProvider theme={theme1}>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className={classes.column_form}
      >
        <span className={classes.enter_title}>
          {isOpenPopupCMS.data ? "Изменение вакансии" : "Новая вакансия"}
        </span>
        <div className={classes.find_table_items}>
          <Controller
            name="name"
            rules={requiredValidation}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Должность*"
                fullWidth
                color="ochre"
                helperText={error && error?.message}
                error={!!error}
              />
            )}
            control={control}
          />
        </div>
        <div className={classes.find_table_items}>
          <Controller
            name="place"
            rules={requiredValidation}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Место*"
                fullWidth
                color="ochre"
                helperText={error && error?.message}
                error={!!error}
              />
            )}
            control={control}
          />
        </div>
        <div className={classes.find_table_items}>
          <Controller
            name="price"
            rules={requiredValidation}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="ЗП*"
                fullWidth
                placeholder="100 000"
                color="ochre"
                helperText={error && error?.message}
                error={!!error}
              />
            )}
            control={control}
          />
        </div>

        <div className={classes.find_table_items}>
          <Controller
            name="responsibilities"
            rules={requiredValidation}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Обязанности*"
                placeholder="Не спать!;Не опаздывать!;Работать все время"
                fullWidth
                multiline
                maxRows={10}
                color="ochre"
                helperText={
                  error
                    ? error?.message
                    : "Обязонности перечислять через точку с запятой!"
                }
                error={!!error}
              />
            )}
            control={control}
          />
        </div>
        <div className={classes.find_table_items}>
          <Controller
            name="conditions"
            rules={requiredValidation}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Условия*"
                placeholder="Не спать!;Не опаздывать!;Работать все время"
                fullWidth
                multiline
                maxRows={5}
                color="ochre"
                helperText={
                  error
                    ? error?.message
                    : "Условия перечислять через точку с запятой!"
                }
                error={!!error}
              />
            )}
            control={control}
          />
        </div>

        <Button
          variant="outlined"
          type="submit"
          fullWidth
          size="large"
          className={classes.main_btn}
          color="ochre"
        >
          {isOpenPopupCMS.data ? "Изменить вакансию" : "Добавить вакансию"}
        </Button>
      </form>
    </ThemeProvider>
  );
});

export default AddVacancies;
