function testEjercicio12(numero) {
    let mensaje = "";
 
  
    if (numero.trim().length > 0 && !isNaN(numero)) {
      let valido = algoritmoLuhn(numero);
      if (valido) {
        //mensaje = `El número: <span><i>${numero}</i></span> <b>es válido<b/>.`;
        return true;
      } else {
       // mensaje = `El número: <span><i>${numero}</i></span> <b>no es válido<b/>.`;
       return false;
      }
    } else {
      mensaje = "debe ingresar números.";
    }
   alert(mensaje);
  }

function algoritmoLuhn(pNumero) {
    /*Se estara iterando numero a numero, desde el final del string hasta el primer caracter, se estarán
      sumando y sustituyendo por duplicado cuando sea par, ya que sería el segundo nro. */
    let suma = 0;
    let digitoVerificadorX = Number(pNumero.charAt(pNumero.length - 1));
    let contador = 0; //para saber cuando estamos en los segundos, lo pares.
    let haynro = true;
    let i = pNumero.length - 2; //el penúltimo.
  
  
    //Mientras los numeros sea mayor o igual a 0 se estara tomando cada caracter
    while (i >= 0 && haynro) {
      //Obtener el numero
      let caracter = pNumero.charAt(i);
      //Valida que el número sea válido
      if (!isNaN(caracter)) {
        let num = Number(caracter);
        //Duplicando cada segundo dígito
        if (contador % 2 == 0) {
          num = duplicarPar(num); //porque si es mayor a 9 se deben sumar.
        }
        suma += num;
      } else {
        haynro = false;
      }
      i--;
      contador++;
    }
    let digitoVerificadorValido = checkDigito(suma, digitoVerificadorX);
    let modulodelasumaValiado = checkModulo(suma, digitoVerificadorX);
    return digitoVerificadorValido && modulodelasumaValiado;
  
  }
  
  function duplicarPar(pNum) {
    pNum = pNum * 2;
    if (pNum > 9) {
      /*Si el resultado del multiplicación es mayor a 9 entonces lo descomponemos y sumamos. 
       Como el numero sera x>=10 && x<=19
       Entonces es 1+(num % 10) 1 más el resto de dividir entre 10.*/
      pNum = 1 + (pNum % 10);
    }
    return pNum;
  }
  
  function checkDigito(pSuma, pDigito) {
    /* 1. Calcular la suma de los dígitos (67).
  2. Multiplicar por 9 (603).
  3. Tomar el último dígito (3).
  4. El resultado es el dígito de chequeo.*/
    let total = 9 * pSuma;
    let ultimoNro = total % 10
    return ultimoNro === pDigito;
  }
  
  function checkModulo(pSuma, pDigito) {
    /*
    Si el total del módulo 10 es igual a O (si el total termina en cero), entonces el número es válido 
  de acuerdo con la fórmula Luhn, de lo contrario no es válido.
    */
    let total = pSuma + pDigito;
    let validacionFinal = false;
    if (total % 10 === 0 && total !== 0) {
      validacionFinal = true;
    }
    return validacionFinal;
  }