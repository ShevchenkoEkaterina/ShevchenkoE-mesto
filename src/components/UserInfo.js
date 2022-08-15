export default class UserInfo {
    constructor({ userName, userDescription }) {
        this._userName = userName;
        this._userDescription = userDescription;
    };
  
    getUserInfo() {
      const userInfo = {
        name: document.querySelector('.input__text_name_edit').value,
        description: document.querySelector('.input__text_description_edit').value,
      }
      return userInfo;
    };

    setUserInfo() {
      document.querySelector('.input__text_name_edit').value = this._userName.textContent;
      document.querySelector('.input__text_description_edit').value = this._userDescription.textContent = this._description;
    };
}