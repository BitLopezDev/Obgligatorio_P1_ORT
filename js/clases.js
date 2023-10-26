class User {
    constructor([name, lastName], [userName, password, userID = 0]){
        this.name = name;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
        this.userID = userID;
        this.isEnabled = false;

       
        
 
    }
    /**
     * @returns boolean
     */

    isUnique() {
        //TODO: Verify that userName and userID are unique to this user.
    }

    enableUser(){
        /*TODO:userID does not exist until Admin's approval of user.
        if userID is unique && userID !== 0 => user is valid
         */
    }

}

class Client extends User {
    constructor([name, lastName], [userName, password, userID],) {
        super([name, lastName], [userName, password, userID]);
        this.role = 'USER';
        
    }
}

class Admin extends User {
    constructor([name, lastName], [userName, password, userID],) {
        super([name, lastName], [userName, password, userID]);
        this.role = 'ADMIN';
    }
}