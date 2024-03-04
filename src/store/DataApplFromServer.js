import { makeAutoObservable } from "mobx";
import { getApplicationsList } from "../config/FireBaseApplications";

class DataApplFromServer {
  _isLoadFromServer = false;
  _listApplications = [];

  constructor() {
    makeAutoObservable(this);
  }
  setListApplications(listApplications) {
    this._listApplications = listApplications;
  }
  get listApplications() {
    return this._listApplications;
  }
  async getFromFirebase() {
    const responce = await getApplicationsList();
    this.setListApplications(responce);
  }
  setIsLoadFromServer(isLoadFromServer) {
    this._isLoadFromServer = isLoadFromServer;
  }
  get isLoadFromServer() {
    return this._isLoadFromServer;
  }
}

export default DataApplFromServer;
