$(init);

function init() {
  /***********
   * Boolen de validation de form
   */
let bUserName = false;
let bUserMail = false;
let bUserMDP = false;
/*********************
 * Récuperation valeur formulaire
 */
let userName = "";
let userMail = "";
let userMDP = "";

  /*****************
   * Page inscription
   ******************/
  let name = $('#name');// gestion du nom 
  bUserName = name.on("input",nameLenght);/********* */

  let mail = $('#email');
  bUserMail = mail.on("input",mailRegex);

}
/****************
 * Function
 ***************/
function nameLenght() {
  let textName = $('#errorName');//*****/
  let img = $( "#name:first-child");
  console.log(img);
  
  let isOk = /.{3,}/.test(this.value);  
  if (isOk) {
      textName.css("color", "black");
      return true ;
  } else {
    textName.text("Choisissez un pseudo contenant au moins 3 caractères");
    textName.css("color", "red");
    return false;
  }
}
function mailRegex(){
  let textMail = $('errorMail');
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let isOk = regex.test(this.value);
  console.log(isOk);
  if (isOk) {
    textMail.css("color", "black");
    return true ;
} else {
  textMail.text("Rentrez un mail valide");
  textMail.css("color", "red");
  return false;
}

}
/****************
 * Fin Function
 ***************/


  /*****************
   * Fin Page inscription
   ******************/
