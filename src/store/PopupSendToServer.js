import { makeAutoObservable } from "mobx";

class PopupApplicationsSendToServer {
  _isOpen = false;
  _isSend = false;
  constructor() {
    makeAutoObservable(this);
  }

  setIsOpen(isOpen) {
    this._isOpen = isOpen;
  }
  get isOpen() {
    return this._isOpen;
  }
  setIsSend(isSend) {
    this._isSend = isSend;
  }
  get isSend() {
    return this._isSend;
  }
}

export default PopupApplicationsSendToServer;
