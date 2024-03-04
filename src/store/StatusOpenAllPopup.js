import { makeAutoObservable } from "mobx";

class StatusOpenAllPopup {
  _isOpen = false;

  constructor() {
    makeAutoObservable(this);
  }
  setIsOpen(isOpen) {
    this._isOpen = isOpen;
  }
  get isOpen() {
    return this._isOpen;
  }
}

export default StatusOpenAllPopup;
