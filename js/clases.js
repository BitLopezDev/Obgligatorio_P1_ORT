class System {
  constructor() {
    this.userList = [];
    this.addUser('John', 'Doe', 'johndoe', '123456', 'client', '1234-1234-1234-1234','123');
    // this.toBeApproved=[];
    //TODO: Preload 5 admins
    this.adminList = [];
    let adminToBe = ["ana", "pippo", "santi", "mile", "nahuel"];
   
    for (let i = 0; i < 5; i++) {
      this.adminList.push(new Admin([adminToBe[i], "ort"], [adminToBe[i], '123456789']));

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
  userExists(userID) {
    
    for (let i = 0; i < this.userList.length; i++) {
        const user = this.userList[i];
        if (user.userID === userID) {
          return true;
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
addUser(name, lastName, userName, password, creditCard = 0, cvc = 0) {
  
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
    return false;
    
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
  constructor(name, lastName, userName, password, creditCard, cvc) {
    this.name = name;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
    this.userID = ++userID;
    this.creditCard = creditCard;
    this.cvc = cvc;
    this.isEnabled = false;
  }

  enableUser() {
    if (system.userExists(this.userID)) {
      this.isEnabled = true;
    }
  }
 
  isCredentialCorrect(username, password) {
    return (this.userName === username && this.password === password);
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
    this.adminID = ++adminID;
  }

  enableUser(whichUser) {
    system.enableUser(whichUser, this.adminID);
    
    //TODO: averiguar si esto pertenece a la clases sistema o a la clase admin
   
  }

}
