import { makeAutoObservable } from "mobx";
import { getVacanciesList } from "../config/FireBaseVacancies";

class DataVacFromServer {
  _isLoadFromServer = false;
  _listVacancies = [];

  constructor() {
    makeAutoObservable(this);
  }
  setListVacancies(listVacancies) {
    this._listVacancies = listVacancies;
  }
  get listVacancies() {
    return this._listVacancies;
  }
  async getFromFirebase() {
    const responce = await getVacanciesList();
    this.setListVacancies(responce);
  }
  setIsLoadFromServer(isLoadFromServer) {
    this._isLoadFromServer = isLoadFromServer;
  }
  get isLoadFromServer() {
    return this._isLoadFromServer;
  }
}

export default DataVacFromServer;
