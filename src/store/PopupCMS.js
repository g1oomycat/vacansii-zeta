import { makeAutoObservable } from "mobx";

class PopupCMS {
  _isOpen = false;
  _isSend = false;
  _changeDataVac = false;
  _delData = false;
  _delDataVac = false;
  _delDataAppl = false;
  _data = null;

  constructor() {
    makeAutoObservable(this);
  }

  //открытие окна
  setIsOpen(isOpen) {
    this._isOpen = isOpen;
  }
  get isOpen() {
    return this._isOpen;
  }
  //подтверждение изменение данных
  setIsSend(isSend) {
    this._isSend = isSend;
  }
  get isSend() {
    return this._isSend;
  }
  //статус добавления или измениния вакансий
  setChangeDataVac(changeDataVac) {
    this._changeDataVac = changeDataVac;
  }
  get changeDataVac() {
    return this._changeDataVac;
  }
  //открытие окна удаления данных
  setDelData(delData) {
    this._delData = delData;
  }
  get delData() {
    return this._delData;
  }
  //статус удалений вакансий
  setDelDataVac(delDataVac) {
    this._delDataVac = delDataVac;
  }
  get delDataVac() {
    return this._delDataVac;
  }
  //статус удалений заявок
  setDelDataAppl(delDataAppl) {
    this._delDataAppl = delDataAppl;
  }
  get delDataAppl() {
    return this._delDataAppl;
  }
  // данные для добавления или изменения или удаления данных
  setData(data) {
    this._data = data;
  }
  get data() {
    return this._data;
  }
}

export default PopupCMS;
