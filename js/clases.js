class System {
  constructor() {
    this.userList = [];
    this.adminList = [];
    this.userLoggedIn = null;
    this.addUser(
      "John",
      "Doe",
      "johndoe",
      "123456",
      "client",
      "1234-1234-1234-1234",
      "123",
      false
    );
    this.addUser(
      "Jane",
      "Doe",
      "janedoe",
      "123456",
      "client",
      "1234-1234-1234-1234",
      "123",
      false
    );
    
/*
this.userList[0].enableUser();
    this.userList[1].enableUser();*/

    // this.toBeApproved=[];

    let adminToBe = ["ana", "pippo", "santi", "mile", "nahuel"];

    for (let i = 0; i < 5; i++) {
      this.adminList.push(
        new Admin([adminToBe[i], "ort"], [adminToBe[i], "123456789"])
      );
    }
  }
  /**
   * @param {number} userID
   * @param {number} adminID
   * @returns boolean
   */
  approveUser(userID, adminID) {
    //
    return this.userExists(userID) && this.userExists(adminID);
  }
  /**
   *
   * @param {number} userID
   * @returns boolean;
   */
  userExists(userName) {
    for (let i = 0; i < this.adminList.length; i++) {
      const user = this.adminList[i];
      if (user.userName === userName) {
        return true;
      }
      for (let i = 0; i < this.userList.length; i++) {
        const user = this.userList[i];
        if (user.userName === userName) {
          return true;
        }
      }
    }
    return false;
  }
  /**
   *
   * @param {string[]} param0
   * @param {string[]} param1
   * @param {string[]} param2
   * @param  {...string[]} param3
   */
  addUser(
    name,
    lastName,
    userName,
    password,
    creditCard = 0,
    cvc = 0,
    isBlocked = false
  ) {
    if (!this.userExists(userName)) {
      this.userList.push(
        new User(name, lastName, userName, password, creditCard, cvc, false)
      );
      
      //TODO: Find out how to procede for user approval
    } else {
      alert("Usuario ya registrado.");
    }
  }

  addAdmin(name, lastName, userName, password) {
    // Agrega el usuario a la lista de usuarios
    this.userList.push(
      new User(name, lastName, userName, password, creditCard, cvc)
    );
  }

  findUserByCredentials(username, password) {
    for (let i = 0; i < this.userList.length; i++) {
      const user = this.userList[i];
      if (user.userName === username && user.password === password) {
        return user;
      }
    }
    for (let i = 0; i < this.adminList.length; i++) {
      const user = this.adminList[i];
      if (user.userName === username && user.password === password) {
        return user;
      }
    }
    return false;
  }
  findUserByUserName(username) {
    for (let i = 0; i < this.userList.length; i++) {
      const user = this.userList[i];
      if (user.userName === username) {
        return user;
      }
    }
    for (let i = 0; i < this.adminList.length; i++) {
      const user = this.adminList[i];
      if (user.userName === username) {
        return user;
      }
    }
    return false;
  }
  findUserByID(givenID) {
    for (let i = 0; i < this.userList.length; i++) {
      const user = this.userList[i];
      if (user.userID === givenID) {
        return user;
      }
    }
    for (let i = 0; i < this.adminList.length; i++) {
      const user = this.adminList[i];
      if (user.adminID === givenID) {
        return user;
      }
    }
    return false;
  }

  isUserEnabled(currentUser){
    
  
     if (currentUser.isEnabled){
      return true;
     }    
     return false;
    
  }
  getEnabledUsers(){
    let enabledList=[];
    for (let i = 0; i < this.userList.length; i++) {
     let currentUser = this.userList[i];
     if (currentUser.isEnabled){
      enabledList.push(currentUser);
     }    
    }
    return enabledList;
    
  }
  getDisabledUsers(){
    let disabledList=[];
    for (let i = 0; i < this.userList.length; i++) {
     let currentUser = this.userList[i];
     if (!currentUser.isEnabled){
      disabledList.push(currentUser);
     }    
    }
    return disabledList;
    
  }
  getUsers(){
    let list=[];
    for (let i = 0; i < this.userList.length; i++) {
      list.push(this.userList[i]);   
    }
    return list;
    
  }
  /**
   * @returns string (hardcoded)
   */
  toString() {
    return "Clase protegida.";
  }
}
let userID = 0;
class User {
  constructor(
    name,
    lastName,
    userName,
    password,
    creditCard,
    cvc,
    isBlocked = false
  ) {
    this.userID = ++userID;
    this.name = name;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
    
    this.creditCard = creditCard;
    this.cvc = cvc;
    this.isEnabled = false;
    this.isAdmin = false;
    this.isBlocked = isBlocked;
  }

  blockUser(){
    this.isBlocked = true;
  }

  unBlockUser(){
    this.isBlocked = false;
  }

  enableUser() {
    this.isEnabled = true;
  }
  disableUser() {
    this.isEnabled = false;
  }

  isCredentialCorrect(username, password) {
    return this.userName === username && this.password === password;
  }

  isUserEnabled() {
    return this.isEnabled;
  }
}

let adminID = 0;
class Admin {
  constructor([name, lastName], [userName, password]) {
    this.name = name;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
    //this.userID = userID++;
    this.isEnabled = true;
    this.adminID = ++adminID;
    this.isAdmin = true;
  }

  enableUser(whichUser) {
    system.enableUser(whichUser, this.adminID);

    //TODO: averiguar si esto pertenece a la clases sistema o a la clase admin
  }
  isUserEnabled() {
    return this.isEnabled;
  }
}
