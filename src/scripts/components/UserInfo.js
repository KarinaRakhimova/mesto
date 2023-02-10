export default class UserInfo {

  constructor(nameSelector, jobSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._profile = {};
    this._profile.name = this._name.textContent;
    this._profile.job = this._job.textContent;
    return this._profile;
  }

  setUserInfo({name, about, avatar, _id}) {
    this._name.textContent = name;
    this._job.textContent = about;
    this._avatar.src = avatar;
    this._id = _id;
  }
}

