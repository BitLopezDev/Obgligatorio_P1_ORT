/**
 * @param {string} theString
 * @param {int} minLength
 * @param {int} maxLength
 * @returns boolean
 */
function verifyString(theString, minLength = 2, maxLength = 50) {
  //Se verifica la longitud del String.
  if (theString.length < minLength || theString.length > maxLength) {
    return false;
  }
  return true;
}
/**
 *
 * @param {string} element : String HTML Selector
 * @returns void
 *
 *  */
function hideElement(element) {
  //Función para ocultar elementos HTML
  get(element).style.display = "none";
}
function showElementBlock(element) {
  //Función para mostrar elementos HTML

  get(element).style.display = "block";
}



/**
 * 
 * @param {string} id : HTML Selector
 * @returns HTMLElement
 */

function get(id) {
 //uso amplio de querySelector.
    return document.querySelector(id);
  
}
function getAll(id) {
 //uso amplio de querySelectorAll.
 
  return document.querySelectorAll(id);

}

/**
 *
 * @param {string} txt
 * @param {int} mayReq
 * @param {int} minReq
 * @param {int} minNumbs
 * @param {int} minLength
 * @returns boolean
 */
function VerifyMayMin( txt, mayReq = 1, minReq = 1, minNumbs = 1, minLength = 5
) {
  //mayReq es la cantidad de mayusculas requeridas.
  //minReq es la cantidad de minusculasrequeridas.
  //minNumbs es la cantidad mínima de números requerida
  //Función que verifica las mayúsculas y minúsculas
  txt = txt.trim();
  let summaMay = 0;
  let summaMin = 0;
  summaNumbs = 0;
  let nums = "0123456789";
  for (let i = 0; i < txt.length; i++) {
    if (txt[i].toUpperCase() === txt[i] && txt[i] !== txt[i].toLowerCase()) {
      //if el char es igual a su mayúscula Y diferente de su minúscula => es letra mayúscula
      summaMay++;
    } else if (
      txt[i].toLowerCase() === txt[i] &&
      txt[i] !== txt[i].toUpperCase()
    ) {
      //if el char es igual a su minúscula Y diferente de su mayúsucla => es letra minúscula

      summaMin++;
    } else if (nums.includes(txt[i])) {
      //si no es letra y es número
      summaNumbs++;
    }
  }
  // Si NO se cumple con el requisito de Mayusculas o minusculas return false, de lo contrario return true;
  if (summaMay < mayReq || summaMin < minReq || summaNumbs < minNumbs || txt.length < minLength
  ) {
    //Si no se cumple alguna de las condiciones se retorna false.
   
    return false;
  }
  return true;
}

/**
 * @param { string } theString
 * @param  { string[] } impureChars : case sensitive
 * @param { string } replacement
 * @returns string
 *purifyThyself('HOLA/ADIOS', ['/'], ' '); => 'HOLA ADIOS';
 */
function purifyThyself(theString, impureChars, replacement) {
  //Función que elimina elementos indeseados de un String
  let purified = theString.trim();

  for (let i = 0; i < impureChars.length; i++) {
    purified = purified.replaceAll(impureChars[i], replacement);
  }
 
  return purified;
}





