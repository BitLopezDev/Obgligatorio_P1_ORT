class System {
  /**
   *
   */
  constructor() {
    this.userList = [];
    this.adminList = [];
    this.userLoggedIn = null;
    this.vms = [];
    this.activity = [];
    this.rents = [];
    this.totalSum = 0;

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
    this.vmsToBe = [
      "c7.small",
      "c7.medium",
      "c7.large",
      "r7.small",
      "r7.medium",
      "r7.large",
      "i7.medium",
      "i7.large",
    ];
    this.vmsTypes = [
      "computo",
      "computo",
      "computo",
      "memoria",
      "memoria",
      "memoria",
      "almacenamiento",
      "almacenamiento",
    ];
    this.vmPrices = [
      [20, 2.5],
      [30, 3.5],
      [50, 6],
      [35, 4],
      [50, 6.5],
      [60, 7],
      [30, 3.5],
      [50, 6.5],
    ];

    for (let index = 0; index < this.vmsToBe.length; index++) {
      this.vms.push(
        new VM(
          this.vmsToBe[index],
          this.vmsTypes[index],
          this.vmPrices[index][0],
          this.vmPrices[index][1],
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
   * @param {string} userName
   * @returns boolean;
   */
  userExists(userName) {
    for (let i = 0; i < this.adminList.length; i++) {
      let user = this.adminList[i];
      if (user.userName === userName) {
        return true;
      }
      for (let i = 0; i < this.userList.length; i++) {
        let user = this.userList[i];
        if (user.userName === userName) {
          return true;
        }
      }
    }
    return false;
  }
  /**
   *
   * @param {string} name
   * @param {string} lastName
   * @param {string} userName
   * @param {string} password
   * @param {string} creditCard
   * @param {string} cvc
   * @returns undefined
   */
  addUser(name, lastName, userName, password, creditCard = 0, cvc = 0) {
    if (!this.userExists(userName)) {
      this.userList.push(
        new User(name, lastName, userName, password, creditCard, cvc, false)
      );
    } else {
      alert("Usuario ya registrado.");
    }
  }
  /**
   *
   * @param {string} name
   * @param {string} lastName
   * @param {string} userName
   * @param {string} password
   */
  addAdmin(name, lastName, userName, password) {
    // Agrega el usuario a la lista de usuarios
    this.userList.push(
      new User(name, lastName, userName, password, creditCard, cvc)
    );
    this.logActivity(
      `Se agrega un Admin al sistema`,
      `SYSTEM ${system.userLoggedIn.userName}`,
      `Se agrego: ${userName}`
    );
  }
  /**
   *
   * @param {string} activity
   * @param {string} users
   * @param {string} details
   * @param  {...String[]} others
   * @returns undefined
   */
  logActivity(activity, users, details, ...others) {
    this.activity.push([
      activity,
      users,
      details,
      JSON.stringify(others) || "No hay extras para este evento",
    ]);
    writeAct();
  }
  /**
   *
   * @param {string} username
   * @param {string} password
   * @returns object || false
   */
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

  /**
   *
   * @param {string} username
   * @returns object || false
   */
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
  /**
   *
   * @param {integer} givenID
   * @returns object || false
   */
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
  /**
   *
   * @param {object} currentUser
   * @returns boolean
   */

  isUserEnabled(currentUser) {
    if (currentUser.isEnabled) {
      return true;
    }
    return false;
  }
  /**
   *
   * @returns object[]
   */
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
  /**
   *
   * @returns object[]
   */
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
  /**
   *
   * @returns object[]
   */
  getUsers() {
    let list = [];
    for (let i = 0; i < this.userList.length; i++) {
      list.push(this.userList[i]);
    }
    return list;
  }
  /**
   *
   * @param {string} type
   * @param {object} user
   */
  rentVMfromSystem(type, user = this.userLoggedIn) {
    let specialization = "";
    if (type.charAt(0) === "c") {
      specialization = "Cómputo";
    } else if (type.charAt(0) === "r") {
      specialization = "Memoria";
    } else if (type.charAt(0) === "i") {
      specialization = "Almacenamiento";
    }
    let rentPrice = 0;
    let turnOnPrice = 0;
    let stock = 0;
    let VMType = null;
    for (let index = 0; index < this.vmsToBe.length; index++) {
      if (type === this.vmsToBe[index]) {
        rentPrice = this.vmPrices[index][0];
        turnOnPrice = this.vmPrices[index][1];
        stock = this.vms[index].stock;
        VMType = this.vms[index];
      }
    }
    if (VMType.stock - 1 >= 0) {
      let beenRented = new Rent(VMType, user);
      // beenRented.rentVM();
      this.vms.push(beenRented);
    }
  }
  /**
   *
   * @param {string} activity
   * @param {string} users
   * @param {string} details
   * @param  {...String[]} others
   */
  logActivity(activity, users, details, ...others) {
    this.activity.push([
      activity,
      users,
      details,
      JSON.stringify(others) || "No hay extras para este evento",
    ]);
    writeAct();
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
  /**
   * @returns undefined
   */

  blockUser() {
    this.isBlocked = true;
    system.logActivity(
      `Se bloqueó usuario`,
      `${this.userID}`,
      `Bloqueado por: ${system.userLoggedIn.userName}`,
      [JSON.stringify(system.userLoggedIn)]
    );
  }
  /**
   * @returns undefined
   */
  unBlockUser() {
    this.isBlocked = false;
    system.logActivity(
      `Se Habilitó un usuario`,
      `${this.userID}`,
      `Habilitado por: ${system.userLoggedIn.userName}`,
      [JSON.stringify(system.userLoggedIn)]
    );
  }
  /**
   * @returns undefined
   */
  enableUser() {
    this.isEnabled = true;
    system.logActivity(
      `Se Deshabilitó un usuario`,
      `${this.userName}`,
      `Deshabilitado por: ${system.userLoggedIn.userName}`,
      [JSON.stringify(system.userLoggedIn)]
    );
  }
  /**
   * @returns undefined
   */
  disableUser() {
    this.isEnabled = false;
    system.logActivity(
      `Se Deshabilitó un usuario`,
      `${this.userName}`,
      `Deshabilitado por: ${system.userLoggedIn.userName}`,
      [JSON.stringify(system.userLoggedIn)]
    );
  }
  /**
   *
   * @param {string} username
   * @param {string} password
   * @returns boolean
   */
  isCredentialCorrect(username, password) {
    return this.userName === username && this.password === password;
  }
  /**
   *
   * @returns boolean
   */

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
  /**
   *
   * @returns boolean
   */
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
    this.isStillRented = false;
  }

  /**
   *
   * @param {integer} unit {-1; 1}
   * @returns false || undefined
   */

  modifyStockByUnit(unit) {
    if (unit === -1 && this.stock - 1 < this.rented) {
      system.logActivity(
        `Se intentó cambiar el stock de ${this.type}`,
        `SYSTEM ${system.userLoggedIn.userName}`,
        `Se retornó: false;`
      );
      loadCatalog();

      return false;
    }
    this.stock += unit;
    loadCatalog();
    system.logActivity(
      `Se  cambió el stock de ${this.type}`,
      `SYSTEM ${system.userLoggedIn.userName}`,
      `Nuevo stock: ${this.stock}`,
      []
    );
  }
  /**
   *
   * @param {object} user
   * @returns undefined
   */
  rentVM(user = system.userLoggedIn) {
    this.isStillRented = true;
    this.rented++;
    this.stock--;
    system.logActivity(`Se renta VM`, `${user.userName}`, `${this.type}`);
    loadCatalog();

    loadRented();
  }
  endRent() {
    this.isStillRented = false;
    this.rented--;
    this.stock++;
    system.logActivity(
      `Se finalizo una renta:`,
      `${system.userLoggedIn.userName}`,
      `${this.type}`
    );
    loadCatalog();
  }
}

//TODO: clases empiezan con mayus
let rentID = 1;
class Rent {
  constructor(VMType, user) {
    this.VMType = VMType;
    this.rentID = rentID++;
    this.user = user;
    this.state = "ON";
    this.turnedOnTimes = 0;
    if (this.VMType.stock - 1 >= 0) {
      this.VMType.rentVM();

      system.rents.push(this);
      loadRented();
      loadCatalogAdmin();
      system.totalSum += this.getRentPrice();
      updateTotalPrice();
    } else {
      // TODO: Change alert for something else;
      alert("Error");
    }
  }
  /**
   * @returns undefined
   */
  turnOffVM() {
    if (this.state !== "OFF") {
      this.state = "OFF";
      system.logActivity(
        `Se apagó una instancia de VM: ${rentID}`,
        `${system.userLoggedIn.userName}`,
        `System Event`
      );
    }
    loadRented();
  }
  /**
   * @returns undefined
   */
  turnOnVM() {
    if (this.state !== "ON") {
      this.state = "ON";
      this.turnedOnTimes++;
      system.totalSum += this.getOnPrice();
      updateTotalPrice();
      system.logActivity(
        `Se prendió una instancia de VM: ${this.rentID}`,
        `${system.userLoggedIn.username}`,
        ``
      );
    }
    loadRented();
  }
  /**
   *
   * @returns object[]
   */
  rentsByCurrentUser() {
    let allRents = [];
    for (let index = 0; index < system.rents.length; index++) {
      if (this.user == system.rents[index].user) {
        allRents.push(this);
      }
    }
    return allRents;
  }
  /**
   * @returns undefined
   */
  endRent() {
    this.VMType.endRent();
    loadRented();
    //Probably does not work
    system.logActivity(
      `Se ordena finalizar renta`,
      `SYSTEM ${system.userLoggedIn.userName}`,
      ``
    );
  }
  /**
   *
   * @returns float
   */

  getRentPrice() {
    return this.VMType.rentPrice;
  }
  /**
   *
   * @returns float
   */
  getOnPrice() {
    return this.VMType.turnOnPrice * this.turnedOnTimes;
  }
  /**
   *
   * @returns finalizoloat
   */
  getTotalPrice() {
    return this.getRentPrice() + this.getOnPrice();
  }
}
