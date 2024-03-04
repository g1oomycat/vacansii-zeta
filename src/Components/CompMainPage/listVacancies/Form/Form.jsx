import React, { useContext } from "react";
import classes from "./form.module.scss";
import "./mui.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  nameValidation,
  requiredValidation,
} from "../../../../validation/validation";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { MuiFileInput } from "mui-file-input";
import { Controller, useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Checkbox,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
  FormControl,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { Context } from "../../../..";
import {
  AddApplicationsList,
  AddApplicationsFile,
} from "../../../../config/FireBaseApplications";

const theme1 = createTheme({
  palette: {
    ochre: {
      main: "#000000",
    },
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: "Montserrat, sans-serif",
    fontSize: 15,
  },
});
const theme2 = createTheme({
  palette: {
    ochre: {
      main: "#000000",
    },
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: "Montserrat, sans-serif",
    fontSize: 10,
  },
});

const Form = observer(({ widthWindow, vacanciesList }) => {
  const { isOpenPopupServer, statusOpenAllPopup } = useContext(Context);
  const { handleSubmit, control, reset } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    statusOpenAllPopup.setIsOpen(true);
    isOpenPopupServer.setIsOpen(true);
    let dataApplication = {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber.replaceAll(" ", ""),
      job: data.job,
      file: null,
      isOpen: false,
    };
    try {
      if (!!data.file) {
        const respURL = await AddApplicationsFile(data.file);
        dataApplication.file = respURL;
      }
      await AddApplicationsList(dataApplication);
      isOpenPopupServer.setIsSend(true);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={widthWindow ? theme1 : theme2}>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className={classes.column_form}
      >
        <span className={classes.enter_title}>Присоединяйтесь к команде</span>
        <div className={classes.find_table_items}>
          <Controller
            name="firstName"
            rules={nameValidation}
            defaultValue={""}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Имя*"
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
            name="lastName"
            defaultValue={""}
            rules={nameValidation}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Фамилия*"
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
            name="phoneNumber"
            defaultValue={""}
            rules={{
              validate: (value) => matchIsValidTel(value),
            }}
            render={({ field, fieldState: { error } }) => (
              <MuiTelInput
                {...field}
                label="Номер телефона*"
                defaultCountry="KZ"
                fullWidth
                color="ochre"
                helperText={error && "Номер телофона не верен"}
                error={!!error}
              />
            )}
            control={control}
          />
        </div>
        <FormControl fullWidth>
          <InputLabel id="label-job" color="ochre">
            Кем вы хотите работать?*
          </InputLabel>
          <Controller
            name="job"
            defaultValue={""}
            rules={requiredValidation}
            render={({ field, fieldState: { error } }) => (
              <>
                <Select
                  {...field}
                  labelId="label-job"
                  color="ochre"
                  label={"Кем вы хотите работать?*"}
                  error={!!error}
                >
                  {vacanciesList.map((item, index) => (
                    <MenuItem
                      key={index}
                      value={`${item.name} (${item.place})`}
                    >
                      {item.name} ({item.place})
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={error}>
                  {error ? error.message : ""}
                </FormHelperText>
              </>
            )}
            control={control}
          />
        </FormControl>

        <FormControl color="ochre">
          <Controller
            name="file"
            control={control}
            defaultValue={""}
            // rules={requiredValidation}
            render={({ field, fieldState: { error } }) => (
              <MuiFileInput
                {...field}
                label="Добавьте свое резюме"
                inputProps={{
                  accept:
                    ".pdf, .doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                }}
                // helperText={fieldState.invalid ? "Поле не заполнено" : ""}
                // error={!!error}
              />
            )}
          />
        </FormControl>
        <div className={classes.form_checkbox}>
          <Controller
            name="accept"
            rules={{ required: "Поле не заполнено" }}
            render={({ field }) => (
              <Checkbox {...field} value={false} color="ochre" />
            )}
            control={control}
          />
          <span>
            Отправляя анкету, я даю свое Согласие на сбор, обработку, хранение и
            использование персональных данных
          </span>
        </div>
        <Button
          variant="outlined"
          type="submit"
          fullWidth
          size="large"
          className={classes.main_btn}
          color="ochre"
        >
          Отправить заявку
        </Button>
      </form>
    </ThemeProvider>
  );
});

export default Form;
