import {profileName,profileDescription} from './utils.js';

export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  getUserInfo() {
    this._name.value = profileName.textContent;
    this._job.value = profileDescription.textContent;
  }

  setUserInfo() {
    profileName.textContent = this._name.value;
    profileDescription.textContent = this._job.value
  }
}

