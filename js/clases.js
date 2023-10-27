class System {
    constructor() {
        this.userList=[];
        this.toBeApproved=[];
        //TODO: Preload 5 admins
        this.adminList=[];
    }
    /**
     * 
     * @param {number} userID 
     * @param {number} adminID 
     * @returns boolean
     */
    approveUser(userID, adminID){
        //
       return (this.userExists(userID) && this.userExists(adminID));
            
    }
/**
 * 
 * @param {number} userID 
 * @returns boolean;
 */
    userExists(userID){
        return true;
    }

}
let userID = 0;
class User {
    constructor([name, lastName], [userName, password], [creditCard, cvc]){
        this.name = name;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
        this.userID = userID++;
        this.creditCard = creditCard;
        this.cvc = cvc;
        this.isEnabled = false;
    }
}

let  adminID = 0;
class Admin {
    constructor([name, lastName], [userName, password]){
        this.name = name;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
        this.userID = userID++;
        this.adminID= adminID++;
    }
}
