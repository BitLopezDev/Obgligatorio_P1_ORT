window.addEventListener("load", inicio);

let system = new System();

/**
 * @returns void
 */
function inicio() {
  get("#loginBtn").addEventListener("click", loginUser);

  get("#registerBtn").addEventListener("click", registerUser);
  hideElement("#contentApp");
  hideLogin();

  // loginUser();
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
  if (VerifyMayMin(registerPswd, 1, 1, 1, 5)) {
    if (registerPswd === registerPswd2) {
      // hideLogin();
      //TODO: Create user
      system.addUser(
        registerName,
        registerLastName,
        registerUserName,
        registerPswd,
        (registerCreditCard = 0),
        (registerCVC = 0)
      );
    } else {
      alert("Las contraseñas no son iguales");
    }
  } else {
    alert("Las contraseñas no cumplen los requisitos");
  }
}

function loginUser() {
  //TODO: verify password
  let loginUserName = get("#loginUserName").value;
  let loginPswd = get("#loginPswd").value;
  let userFound = system.findUserByCredentials(loginUserName, loginPswd);
  if (!userFound || !userFound.isUserEnabled()) {
    alert(
      "Usuario y/o contraseña incorrectos o usuario no habilitado por administración"
    );
  } else {
    hideLogin();
    // if(loginUserName === userFound.userName && loginPswd === userFound.password){

    // }
  }
  /*if(!userFound || !userFound.isUserEnabled() ){
    alert("Usuario y/o contraseña incorrectos o usuario no habilitado por administración");
  } else {

    hideLogin();
    // if(loginUserName === userFound.userName && loginPswd === userFound.password){
      
    // } 
  }*/
}
function hideLogin() {
  hideElement("#loginRegister");
  showElementBlock("#contentApp");
}

//TODO: Find 'La cantidad de maquinas en uso las define el programador o las define el conjunto de usuarios que hayan iniciado sesión antes que elñ administador?'

window.addEventListener("error", handleError);

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
