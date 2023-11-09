class System {
  constructor() {
    this.userList = [];
    this.adminList = [];
    this.userLoggedIn = null;
    this.vms = [];
    this.rents =[];

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
    let vmsToBe = [
      "c7.small",
      "c7.medium",
      "c7.large",

      "r7.small",
      "r7.medium",
      "r7.large",

      "i7.medium",
      "i7.large",
    ];
    let vmsTypes = [
      "computo",
      "computo",
      "computo",
      "memoria",
      "memoria",
      "memoria",
      "almacenamiento",
      "almacenamiento",
    ];
    let vmPrices = [
      [20, 2.5],
      [30, 3.5],
      [50, 6],
      [35, 4],
      [50, 6.5],
      [60, 7],
      [30, 3.5],
      [50, 6.5],
    ];

    for (let index = 0; index < vmsToBe.length; index++) {
      this.vms.push(
        new VM(
          vmsToBe[index],
          vmsTypes[index],
          vmPrices[index][0],
          vmPrices[index][1],
          15
        )
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

  isUserEnabled(currentUser) {
    if (currentUser.isEnabled) {
      return true;
    }
    return false;
  }
  getEnabledUsers() {
    let enabledList = [];
    for (let i = 0; i < this.userList.length; i++) {
      let currentUser = this.userList[i];
      if (currentUser.isEnabled) {
        enabledList.push(currentUser);
      }
    }
    return enabledList;
  }
  getDisabledUsers() {
    let disabledList = [];
    for (let i = 0; i < this.userList.length; i++) {
      let currentUser = this.userList[i];
      if (!currentUser.isEnabled) {
        disabledList.push(currentUser);
      }
    }
    return disabledList;
  }
  getUsers() {
    let list = [];
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

  blockUser() {
    this.isBlocked = true;
  }

  unBlockUser() {
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

let nextVMId = 1;
class VM {
  constructor(type, specialization, rentPrice, turnOnPrice, stock) {
    this.type = type;
    this.specialization = specialization;
    this.id = `INSTANCE_ID_${nextVMId++}`;
    this.rentPrice = rentPrice;
    this.turnOnPrice = turnOnPrice;
    this.stock = stock;
    this.rented = 0;
    
  }

  modifyStock(newStock) {
    if (this.rented > newStock) {
      return false;
    }
    this.stock = newStock;
    loadCatalog()
  }

  rentVM(){
    this.rented++;
    this.stock--;
    loadCatalog();
    loadRented();

  }
  endRent(){
    this.rented--;
    this.stock++;
    loadCatalog();
    loadRented()
  };
}

//TODO: clases empiezan con mayus
let rentID = 0;
class Rent {
  constructor(VMType, user) {
    this.VMType = VMType;
    this.rentID = rentID++;
    this.user = user;
    this.state = "ON";
    this.turnedOnTimes = 0;
    this.VMType.rentVM();
    system.rents.push(this);
    loadRented();
  }

  turnOffVM(rentID) {
    if (this.rentID === rentID && this.state !== "OFF") {
      this.state = "OFF";
    }
    loadRented()
  }

  turnOnVM(rentID) {
    if (this.rentID === rentID && this.state !== "ON") {
      this.state = "ON";
      this.turnedOnTimes++;
    }
    loadRented()
  }
  rentsByCurrentUser(){
    let allRents =[];
    for (let index = 0; index < system.rents.length; index++) {
     if(this.user == system.rents[index].user){
      allRents.push(this);
     }
      
    }
    return allRents;
  }
  endRent(){
    this.VMType.endRent();
    //Probably does not work
    loadRented();
  }
}
