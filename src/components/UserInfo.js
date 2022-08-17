export default class UserInfo {
    constructor({ userNameSelector, userDescriptionSelector }) {
        this._userName = document.querySelector(userNameSelector);
        this._userDescription = document.querySelector(userDescriptionSelector);;
    };
  
    getUserInfo() {
      const userInfo = {
        name: this._userName.textContent,
        description: this._userDescription.textContent,
      }
      return userInfo;
    };

    setUserInfo() {
      this.getUserInfo()
      this._userName.textContent = this.name;
      this._userDescription.textContent = this.description;
    }
}