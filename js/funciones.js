window.addEventListener("load", inicio);
window.addEventListener("error", handleError);
let system = new System();

/**
 * @returns void
 */
function inicio() {
  get("#loginBtn").addEventListener("click", loginUser);

  get("#registerBtn").addEventListener("click", registerUser);
  hideElement("#contentApp");
  hideElement("#seccionAdministrador");
  loadUserTable();
  get("#radioAll").addEventListener("click", loadUserTable);
  get("#radioEnabled").addEventListener("click", loadUserTable);
  get("#radioDisabled").addEventListener("click", loadUserTable);
  get("#logOutbtn").addEventListener("click", logOut);
  loadCatalog();
  get("#WhichVMButton").addEventListener("click", loadRented);
}

function registerUser() {
  let registerPswd = get("#registerPswd").value;
  let registerName = get("#registerName").value;
  let registerLastName = get("#registerLastName").value;
  let registerUserName = get("#registerUserName").value;
  let registerPswd2 = get("#registerPswd2").value;
  let registerCreditCard = get("#registerCreditCard").value;
  let registerCVC = get("#registerCVC").value;

  if (!verifyString(registerName)) {
    alert("Error en el nombre");
    return;
  }
  if (!verifyString(registerLastName)) {
    alert("Error en el apellido");
    return;
  }
  if (!verifyString(registerUserName)) {
    alert("Error en el nombre de usuario");
    return;
  }
  if (!verifyString(purifyThyself(registerCreditCard, ["-"], ""), 16, 16)) {
    alert(`Error en la tarjeta de credito ${registerCreditCard}`);
    return;
  }
  if (!testEjercicio12(purifyThyself(registerCreditCard, ["-"], ""))) {
    alert(`Error en la tarjeta de credito ${registerCreditCard}`);
    return;
  }
  if (VerifyMayMin(registerPswd, 1, 1, 1, 5)) {
    if (registerPswd === registerPswd2) {
      // hideLogin();
      //TODO: Create user
      system.addUser(
        registerName,
        registerLastName,
        registerUserName,
        registerPswd,
        registerCreditCard,
        registerCVC
      );
    } else {
      alert("Las contraseñas no son iguales");
    }
  } else {
    alert("Las contraseñas no cumplen los requisitos");
  }
}

function loginUser() {
  get("#tInstancesRented").innerHTML = "";
  let loginUserName = get("#loginUserName").value;
  let loginPswd = get("#loginPswd").value;
  let userFound = system.findUserByCredentials(loginUserName, loginPswd);
  if (!userFound || !userFound.isUserEnabled() || userFound.isBlocked) {
    alert(
      "Usuario y/o contraseña incorrectos o usuario no habilitado por administración"
    );
  } else {
    let type = "client";
    if (userFound.isAdmin) {
      type = "admin";
    }

    hideLogin(type);

    system.userLoggedIn = userFound;
    loadRented();
    // console.log("Usuario Logueado",userFound);
    // if(loginUserName === userFound.userName && loginPswd === userFound.password){
    // }
  }
}

function logOut() {
  hideElement("#seccionAdministrador");
  showElementBlock("#loginRegister");
  hideElement("#contentApp");
  system.userLoggedIn = null;
}
function hideLogin(userType = "client") {
  if (userType === "admin") {
    showElementBlock("#seccionAdministrador");
  }
  hideElement("#loginRegister");
  showElementBlock("#contentApp");
}

//TODO: Find 'La cantidad de maquinas en uso las define el programador o las define el conjunto de usuarios que hayan iniciado sesión antes que elñ administador?'

function loadUserTable() {
  let text = "";
  let list;

  if (get("#radioAll").checked) {
    list = system.getUsers();
  } else if (get("#radioEnabled").checked) {
    list = system.getEnabledUsers();
  } else {
    list = system.getDisabledUsers();
  }

  for (let i = 0; i < list.length; i++) {
    let objUsuario = list[i];
    text += `
      <tr>
          <td>${objUsuario.userID}</td>
          <td>${objUsuario.name}</td>
          <td>${objUsuario.lastName}</td>
          <td>${objUsuario.userName}</td>`;
    if (!objUsuario.isEnabled) {
      text += `<td><input type="button" value="Activar" id="${objUsuario.userID}-enable" class="classEnableDin"></td>`;
    } else {
      text += `<td><input type="button" value="Desactivar" id="${objUsuario.userID}-disable" class="classDisableDin"></td>`;
    }
    if (!objUsuario.isBlocked) {
      text += `<td><input type="button" value="Bloquear" id="${objUsuario.userID}-block" class="classBlockDin"></td></tr>`;
    } else {
      text += `<td><input type="button" value="Desbloquear" id="${objUsuario.userID}-unblock" class="classUnBlockin"></td></tr>`;
    }
  }
  get("#tablaListarUsuarios").innerHTML = text;
  //Luego del innerHTML la tabla y botones existen
  //Este codigo agregar el listener a los botones
  let BtnsEnable = document.querySelectorAll(".classEnableDin");
  for (let i = 0; i < BtnsEnable.length; i++) {
    let button = BtnsEnable[i];
    button.addEventListener("click", dinEnable);
  }

  let BtnDisable = document.querySelectorAll(".classDisableDin");
  for (let i = 0; i < BtnDisable.length; i++) {
    let button = BtnDisable[i];
    button.addEventListener("click", Dindisable);
  }
  ////////////
  let BtnsEnable2 = document.querySelectorAll(".classBlockDin");
  for (let i = 0; i < BtnsEnable2.length; i++) {
    let button = BtnsEnable2[i];
    button.addEventListener("click", dinBlock);
  }

  let BtnDisable2 = document.querySelectorAll(".classUnBlockin");
  for (let i = 0; i < BtnDisable2.length; i++) {
    let button = BtnDisable2[i];
    button.addEventListener("click", dinUnBlock);
  }
}
function instanceRentF(instance) {
  system.rentVMfromSystem(instance, system.userLoggedIn);
}
function loadCatalog() {
  let catalogTbodyCompute = get("#catalogTbodyCompute");
  let catalogTbodyMemory = get("#catalogTbodyMemory");
  let catalogTbodyAStorage = get("#catalogTbodyAStorage");

  catalogTbodyCompute.innerHTML = `
  <tr>
  <td>c7.large</td>
  <td>U$S 50</td>
  <td>U$S 6</td>
  <td>${system.vms[2].stock}</td>
  <td><button onclick="instanceRentF('c7.large');">Alquilar una instancia</button></td>
</tr>
<tr>
  <td>c7.medium</td>
  <td>U$S 30</td>
  <td>U$S 3,50</td>
  <td>${system.vms[1].stock}</td>
  <td><button onclick="instanceRentF('c7.medium');">Alquilar una instancia</button></td>
</tr>
<tr>
  <td>c7.small</td>
  <td>U$S 20</td>
  <td>U$S 2,50</td>
  <td>${system.vms[0].stock}</td>
  <td><button onclick="instanceRentF('c7.small');">Alquilar una instancia</button></td>
</tr>
  `;
  catalogTbodyMemory.innerHTML = `
  <tr>
  <td>r7.large</td>
  <td>U$S 60</td>

  <td>U$S 7</td>
  <td>${system.vms[5].stock}</td>
  <td><button onclick="instanceRentF('r7.large');">Alquilar una instancia</button></td>
</tr>
<tr>
  <td>r7.medium</td>
  <td>U$S 50</td>
  <td>U$S 6,50</td>
  <td>${system.vms[4].stock}</td>
  <td><button onclick="instanceRentF('r7.medium');">Alquilar una instancia</button></td>
</tr>
<tr>
  <td>r7.small</td>
  <td>U$S 35</td>
  <td>U$S 4</td>
  <td>${system.vms[2].stock}</td>
  <td><button onclick="instanceRentF('r7.small');">Alquilar una instancia</button></td>
</tr>
  `;

  catalogTbodyAStorage.innerHTML = `
  <tr>
                            <td>i7.large</td>
                            <td>U$S 50</td>
                            <td>U$S 6,50</td>
                            <td>${system.vms[7].stock}</td>
                            <td><button onclick="instanceRentF('i7.large');">Alquilar una instancia</button></td>
                        </tr>
                        <tr>
                            <td>i7.medium</td>
                            <td>U$S 30</td>
                            <td>U$S 3,50</td>
                            <td>${system.vms[6].stock}</td>
                            <td><button onclick="instanceRentF('i7.medium');">Alquilar una instancia</button></td>
                        </tr>
  `;
}

function turnOffF(rentInstance) {
  rentInstance.turnOffVM();
}

function loadRented() {
  let toShow =system.rents;
  let which = get("#VMschoice").value;
  let tInstancesRented = get("#tInstancesRented");

  let insert = "";
 let whichClass ='';
  
  for (let i = 0; i < toShow.length; i++) {
    if (
      toShow[i].user === system.userLoggedIn &&
      toShow[i].VMType.isStillRented
    ) {
      //console.log(system.rents[i]);
      if((toShow[i].state=== "ON" && which==='off') || (toShow[i].state=== "OFF" && which==='on')) {

             whichClass = 'isHidden'   ;              
      } else {
        whichClass ='';
      }
      insert =
        insert +
        `
                         <tr class ="${whichClass}">
                             <td>${toShow[i].rentID}</td>
                             <td>${toShow[i].VMType.type}</td>
                             <td>${toShow[i].VMType.specialization}</td>
                             <td>${toShow[i].state}</td>
                             <td>${toShow[i].turnedOnTimes}</td>
                             <td>${toShow[i].getTotalPrice()}</td>
                            
    `;
      if (toShow[i].state === "ON") {
        insert =
          insert +
          `
     <td>
     <button onclick="system.rents[${i}].turnOffVM()">Apagar</button>

            
                             </td>
                             <td>
                             <button onclick="system.rents[${i}].endRent()">Desalquilar</button>            
                             </td>
                         </tr>
     `;
      } else {
        insert =
          insert +
          `
     <td>
     <button onclick="system.rents[${i}].turnOnVM()">Prender</button>             
                             </td>
                             <td>
                    <button onclick="system.rents[${i}].endRent()">Desalquilar</button>            
                             </td>
                         </tr>
                         </tr>
     `;
      }
      tInstancesRented.innerHTML = insert;
    } else if (
      system.rents[i].user === system.userLoggedIn &&
      !system.rents[i].VMType.isStillRented
    ) {
      tInstancesRented.innerHTML = ``;
    }
  }
}
function filterVMs() {}

function dinBlock() {
  let id = parseInt(this.id);
  system.findUserByID(id)?.blockUser();
  loadUserTable();
}

function dinUnBlock() {
  let id = parseInt(this.id);
  system.findUserByID(id)?.unBlockUser();
  loadUserTable();
}

function dinEnable() {
  let id = parseInt(this.id);
  system.findUserByID(id)?.enableUser();
  loadUserTable();
}

function Dindisable() {
  let id = parseInt(this.id);
  system.findUserByID(id)?.disableUser();
  loadUserTable();
}

/////////////////////// DO NOT CODE BELLOW ///////////////////////// DO NOT CODE BELLOW ///////////
/**
 *
 * @param {ErrorEvent} event
 * @returns boolean
 */
function handleError(event) {
  var errorInfo = {
    message: event.message,
    source: event.filename,
    line: event.lineno,
    column: event.colno,
    errorObject: event.error,
  };
  error(`Ha ocurrido un error: ${errorInfo.message}`, errorInfo, false);

  return false;
}
