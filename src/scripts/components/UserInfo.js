export default class UserInfo {

  constructor(nameSelector, jobSelector) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  getUserInfo() {
    this._profile = {};
    this._profile.name = this._name.textContent;
    this._profile.job = this._job.textContent;
    return this._profile;
  }

  setUserInfo(someInfo) {
    this._name.textContent = someInfo.name;
    this._job.textContent = someInfo.about;
  }
}

