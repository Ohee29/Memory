$(init);
//  Boolen de validation de form plus input si vraie
let bUserName=false;
let bUserMail=false;
let bUserPsw=false;
let bSamePsw=false;

function init() {
  /***********

  /*****************
   * Page inscription
   ******************/

  $('#name').on("input", nameLenght);
  $('#email').on("input", mailRegex);
  $('#psw').on("input", pswPattern);
  $('#pswConfirm').on("input", pswConfirm);
  $('#reset').on("click", formAnnul);
  $('#createAccount').on("submit", inscription);
  $("form").on("submit", inscription);
}
/****************
 * Function
 ***************/
function nameLenght() {
  let textName = $('#errorName');//*****/
  let img = $("#imgName");
  let isOk = /.{3,}/.test($(this).val());
  if (isOk) {
    textName.css("color", "black");
    img.attr('src', "../images/check.svg");
    bUserName = { b: true, name: ($(this).val()) };
  } else {
    textName.text("Choisissez un pseudo contenant au moins 3 caractères");
    textName.css("color", "red");
    img.attr('src', "../images/error.svg");
    if ($('#name').val() == "") {
      $("#imgName").attr('src', "");
    }
    bUserName = { b: false };
  }
  validationBtnCompte();
}
function mailRegex() {
  let textMail = $('#errorMail');
  let img = $("#imgMail");
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let isOk = regex.test($(this).val());
  if (isOk) {
    textMail.css("color", "black");
    img.attr('src', "../images/check.svg");
    bUserMail = { b: true, mail: ($(this).val()) };
  } else {
    textMail.text("Rentrez un mail valide");
    img.attr('src', "../images/error.svg");
    textMail.css("color", "red");
    if ($('#email').val() == "") {
      $("#imgMail").attr('src', "");
    }
    bUserMail = { b: false };
  }
  validationBtnCompte();
}
function pswPattern() {

  let textPsw = $('#errorPsw');
  let img = $("#imgPsw");


  let regexPsw = /^(?=.*\d)(?=.*[\W_]).{6,}$/;
  let isOk = regexPsw.test(this.value);


  if ($(this).val().length == 0) {
    $("#faible").css('visibility', 'hidden');
    $("#moyen").css('visibility', 'hidden');
    $("#fort").css('visibility', 'hidden');
  }
  if ($(this).val().length <= 4) {
    $("#faible").css('visibility', 'visible');
    $("#moyen").css('visibility', 'hidden');
    $("#fort").css('visibility', 'hidden');
  }
  if ($(this).val().length > 4 && $(this).val().length <= 8) {
    $("#moyen").css('visibility', 'visible');
    $("#fort").css('visibility', 'hidden');
  }
  if ($(this).val().length > 8) {
    $("#fort").css('visibility', 'visible');
  }

  if (isOk) {
    textPsw.css("color", "black");
    img.attr('src', "../images/check.svg");
    bUserPsw = { b: true, password: $(this).val() };
  } else {
    textPsw.text("Au moins un symbole, un chiffre, ainsi que 6 caractères minimum.");
    img.attr('src', "../images/error.svg");
    textPsw.css("color", "red");
    if ($('#psw').val() == "") {
      $("#imgPsw").attr('src', "");
    }
    bUserPsw = { b: false };
  }
  validationBtnCompte();
}
function pswConfirm() {
  let textPsw = $('#errorPswC');
  let img = $("#imgPswC");

  let isOk = $('#psw').val() == $('#pswConfirm').val();

  if (isOk) {
    textPsw.css("color", "black");
    img.attr('src', "../images/check.svg");
    bSamePsw = true;
  } else {
    textPsw.text("Les deux mots de passe ne sont pas identiques.");
    img.attr('src', "../images/error.svg");
    textPsw.css("color", "red");
    if ($('#pswConfirm').val() == "") {
      $("#imgPswC").attr('src', "");
    }
    bSamePsw = false;
  }
  validationBtnCompte();
}
function formAnnul() {
  $("#imgName").attr('src', "");
  $("#imgMail").attr('src', "");
  $("#imgPsw").attr('src', "");
  $("#imgPswC").attr('src', "");
  $("#faible").css('visibility', 'hidden');
  $("#moyen").css('visibility', 'hidden');
  $("#fort").css('visibility', 'hidden');
}
function validationBtnCompte(){
  if (!(bUserName.b && bUserMail.b && bUserPsw.b && bSamePsw)) {
    $('#createAccount').prop('disabled',true);
  }else{
    $('#createAccount').prop('disabled',false);
  }
}
function inscription(event) {
  /********si tout et bon **** */
  event.preventDefault(); // Empêche le rechargement de la page
  if (bUserName.b && bUserMail.b && bUserPsw.b && bSamePsw) {
      let users = (localStorage.getItem('users')) || [];
      localStorage.setItem("users","SeBasTien");
      localStorage.setItem("users","Poussin");
      localStorage.pu("users","Autre");
      console.log(users);
      
      // localStorage.setItem("Name",bUserName.name);

      
    // console.log($(this).serialize());
    

  } else {
    !bUserName.b && alert("Veuillez entrer un nom !")
  }
}





/****************
 * Fin Function
 ***************/


/*****************
 * Fin Page inscription
 ******************/
