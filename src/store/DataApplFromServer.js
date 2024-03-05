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
    const sortedApplications = responce.sort((a, b) => {
      return b.date.seconds - a.date.seconds;
    });
    this.setListApplications(sortedApplications);
  }
  setIsLoadFromServer(isLoadFromServer) {
    this._isLoadFromServer = isLoadFromServer;
  }
  get isLoadFromServer() {
    return this._isLoadFromServer;
  }
}

export default DataApplFromServer;
