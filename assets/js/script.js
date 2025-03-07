$(init);
//  Boolen de validation de form plus input si vraie
let bUserName = false;
let bUserMail = false;
let bUserPsw = false;
let bSamePsw = false;
let pageProfil = "profil.html";
let pageJouer = "jouer.html";
let connexion = "connexion.html"


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
  $('#createAccount').on("click", inscription);
  $('#connexion').on('click', checkUsers);
  $('#choixMemory').on('change', choiceDisplay);
  $('#option').on('click', recordingChoice);
  autofill();
  $('.cards').on('click', flipCard);

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


  let regexPsw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  let regNombre = /^(?=.*\d)/;
  let regSpeciaux = /^(?=.*[@$!%*?&])/;
  let isOk = regexPsw.test(this.value);


  if ($(this).val().length == 0) {
    $("#faible").css('visibility', 'hidden');
    $("#moyen").css('visibility', 'hidden');
    $("#fort").css('visibility', 'hidden');
  }
  if ($(this).val().length <= 6) {
    $("#faible").css('visibility', 'visible');
    $("#moyen").css('visibility', 'hidden');
    $("#fort").css('visibility', 'hidden');
  }
  if ($(this).val().length > 6 && $(this).val().length <= 8 && (regNombre.test(this.value) || regSpeciaux.test(this.value))) {
    $("#moyen").css('visibility', 'visible');
    $("#fort").css('visibility', 'hidden');
  }
  if ($(this).val().length > 8 && isOk) {
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
    bUserPsw = { b: false };
    if ($('#psw').val() == "") {
      $("#imgPsw").attr('src', "");
    }

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
function validationBtnCompte() {
  if (!(bUserName.b && bUserMail.b && bUserPsw.b && bSamePsw)) {
    $('#createAccount').prop('disabled', true);
  } else {
    $('#createAccount').prop('disabled', false);
  }
}
function inscription(event) {
  // console.log("Entrez dans iscrption");
  /********si tout et bon **** */
  if (bUserName.b && bUserMail.b && bUserPsw.b && bSamePsw) {
    console.log("TOUT EST BON ");
    saveUser(bUserName.name, bUserMail.mail, bUserPsw.password);
  }
}
/**************creation users******************* */
function saveUser(name, email, password) {
  let users = getUsers();


  // Vérifier si l'utilisateur existe déjà
  if (users.some(user => email === user.email) || users.some(user => name === user.name)) {
    if (users.some(user => name === user.name)) {
      alert("Pseudo déjà utilisé");
    }
    if (users.some(user => email === user.email)) {
      alert("Email déjà utilisé");
    }
  } else {

    let newUser = {
      name: name,
      email: email,
      password: password,
      bestScore: 0,
      lastScore: 0,
      connect: false

    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = 'connexion.html'
  }

}
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}



/****************
 * Fin Function
 ***************/
/*****************
 * Fin Page inscription
 ******************/
/*****************
 *  Page Connexion
 ******************/
/***********verifier si l'utilisateur a creer un compte  */


function checkUsers() {
  let users = getUsers();
  // console.log(users);
  let email = $('#emailLogin').val().trim();  // Stocker l'email
  let password = $('#pswLogin').val().trim(); // Stocker le mot de passe
  let userVal = users.find(user => user.email === email && user.password === password)
  if (userVal) {
    userVal.connect = true;
    localStorage.setItem("users", JSON.stringify(users)); // Sauvegarder !!!!
    window.location.href = 'profil.html';
  } else {
    alert("Erreur, veuilles saisir les informations correctement.")

  }
}

/*****************
 * Fin Page Connexion
 ******************/
/*****************
 * Page Profil
 ******************/
/******* recuperation choix memory */
function autofill() {
  let page = window.location.href.split("/");
  /*************page profil***** */
  if (page[page.length - 1] === pageProfil) {
    let users = getUsers();

    let userConnect = users.find(user => user.connect === true);
    $('#userNames').val(userConnect.name);
    $('#userEmail').val(userConnect.email);

    if (!(userConnect.taille === "")) {
      $('#pseudoJoueur').text(userConnect.name);
      $('#scoreJoueur').text(userConnect.bestScore);
      $('#tailleChoixJoueur').text(userConnect.taille);
      $('#memoryChoixJoueur').text(userConnect.memory);
      $('#dateEnregJoueur').text(userConnect.date);
      $('#tabScore').show();
    }
    if (userConnect.connect && !(userConnect.date === "")) {
      console.log("OK POUR JOUER");

      $('#play').attr("href", "jouer.html");
    } else { $('#play').attr('href', "#"); }
  }
  /************* Fin page profil***** */
  /************* page jouer ********* */
  // Fonction pour afficher les 5 meilleurs scores
  if (page[page.length - 1] === pageJouer) {
    displayTopScores();
    displayCards();
  }
  /*************Fin page jouer ********* */
  if (page[page.length - 1] === connexion) {

    disconnectAllusers();

  }

}
function disconnectAllusers() {
  let users = getUsers();
  users.forEach(user => {
    user.connect = false;
    console.log(user.connect);

  });
  localStorage.setItem("users", JSON.stringify(users)); // Sauvegarder !!!!
}

function displayTopScores() {
  let users = getUsers();
  let topUsers = users.sort((a, b) => b.bestScore - a.bestScore).slice(0, 5);
  let leaderboard = document.getElementById("tabBestScore");
  topUsers.forEach((user, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      
      <td>${user.name}</td>
      <td>${user.bestScore}</td>
      <td>${user.taille}</td> 
      <td>${user.memory}</td> 
      <td>${user.date}</td>
      `;
    leaderboard.appendChild(row);
  });
}

let flippedCards = []; // Stocke les cartes retournées
let scoreJoueur = 0;

function flipCard(card) {
  numOfMoves();
  // Empêcher de retourner plus de 2 cartes en même temps
  if (flippedCards.length >= 2 || card.classList.contains("flipped") || card.classList.contains("matched")) {
    return;
  }

  // Retourner la carte
  card.classList.add("flipped");

  flippedCards.push(card);

  // Vérifier si deux cartes sont retournées
  if (flippedCards.length === 2) {
    checkMatch();
  }
}
let NumOfMoveGame = 0;
let nbPaireTotal = 0;
let nbPaireNow = 0;
function numOfMoves() {
  NumOfMoveGame++;


  $('#numMoves').text(NumOfMoveGame);
}
function checkMatch() {
  let users = getUsers();
  let userConnect = users.find(user => user.connect === true);


  let [card1, card2] = flippedCards;
  let backImage1 = card1.querySelector(".card-back img");
  let imageUrl1 = backImage1.src;
  let backImage2 = card2.querySelector(".card-back img");
  let imageUrl2 = backImage2.src;

  let card1Value = imageUrl1.split("/");
  card1Value = card1Value[card1Value.length - 1];
  console.log(card1Value);
  let card2Value = imageUrl2.split("/");
  card2Value = card2Value[card2Value.length - 1];
  console.log(card2Value);


  if (card1Value === card2Value) {
    // Les cartes correspondent
    card1.classList.add("matched");
    card2.classList.add("matched");
    scoreJoueur++;

    nbPaireNow++;
    console.log(nbPaireNow);

    $('#numScore').text(scoreJoueur);
    if (nbPaireNow === nbPaireTotal) {
      userConnect.lastScore = scoreJoueur;
      if (scoreJoueur >= userConnect.bestScore) {
        console.log(userConnect.bestScore);
        console.log(scoreJoueur);

        userConnect.bestScore = scoreJoueur;
        localStorage.setItem("users", JSON.stringify(users));
        console.log("Entrez score");

      }
    }
    flippedCards = []; // Réinitialiser
  } else {
    // Les cartes ne correspondent pas, les retourner après 1 seconde
    scoreJoueur -= 0.5;
    $('#numScore').text(scoreJoueur);
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");

      flippedCards = []; // Réinitialiser
    }, 1000);

  }
}
function themesCard() {
  let users = getUsers();
  let userConnect = users.find(user => user.connect === true);

  switch (userConnect.memory) {
    case "alphabet-scrabble": return ["1.png", "2.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png", "11.png", "12.png", "13.png", "14.png", "15.png", "16.png", "17.png", "18.png", "19.png", "20.png", "21.png", "22.png", "23.png", "24.png", "25.png", "26.png"];
      break;
      chiens
    case "animaux": return ["1.webp", "2.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp", "9.webp", "10.webp", "11.webp", "12.webp", "13.webp", "14.webp", "15.webp", "16.webp", "17.webp", "18.webp", "19.webp", "20.webp", "21.webp", "22.webp", "23.webp", "24.webp", "25.webp", "26.webp", "27.webp"];
      break;
    case "animauxAnimes": return ["1.webp", "2.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp"];
      break;
    case "animauxdomestiques": return ["1.webp", "2.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp", "9.webp"];
      break;

    case "chiens": return ["1.webp", "2.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp", "9.webp", "10.webp", "11.webp", "12.webp", "13.webp", "14.webp", "15.webp", "16.webp", "17.webp", "18.webp", "19.webp", "20.webp", "21.webp", "22.webp", "23.webp"];
      break;
    case "dinosaures":
    case "dinosauresAvecNom": return ["1.jpg", "2.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg"];
      break;
    case "memory-legume": return ["1.svg", "2.svg", "4.svg", "5.svg", "6.svg"];
      break;

    default: return ["1.png", "2.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png", "11.png", "12.png", "13.png", "14.png", "15.png", "16.png", "17.png", "18.png", "19.png", "20.png", "21.png", "22.png", "23.png", "24.png", "25.png", "26.png"];
      break;
  }
}
function generateMemoryCards(images, totalCards) {
  let numPairs = totalCards / 2; // Nombre de paires nécessaires
  let selectedImages = images.sort(() => 0.5 - Math.random()).slice(0, numPairs); // Sélectionne aléatoirement des images

  let cards = [...selectedImages, ...selectedImages]; // Duplique les images pour avoir les paires
  cards.sort(() => 0.5 - Math.random()); // Mélange les cartes

  return cards; // Retourne les cartes mélangées
}
document.addEventListener("keydown", function (event) {
  if (event.key === " ") {  // Si la barre d'espace est pressée
    restartGame();  // Relancer le jeu
  }
});
function restartGame() {
  // Réinitialiser toutes les cartes : retirer la classe "flipped" et "matched"
  $('#numMoves').text("0");
  NumOfMoveGame = 0;
  scoreJoueur = 0;
  $('#numScore').text("0");
  let allCards = document.querySelectorAll(".memory-card");
  allCards.forEach(card => {
    card.classList.remove("flipped", "matched");

  });

  // Réinitialiser le tableau flippedCards pour une nouvelle partie
  flippedCards = [];

  // Mélanger les cartes 
  displayCards();
}

function displayCards() {
  let users = getUsers();
  let userConnect = users.find(user => user.connect === true);
  let nbDiv;
  let tabCard = document.getElementById("canvasCard");
  tabCard.innerHTML = "";
  if (userConnect.taille === "4par3") {
    nbDiv = 12;

  }
  if (userConnect.taille === "6par4") {
    nbDiv = 24;
  }
  if (userConnect.taille === "6par6") {
    nbDiv = 36;
  }
  nbPaireTotal = nbDiv / 2;
  let tabCardusers = themesCard();
  let shuffleCards = generateMemoryCards(tabCardusers, nbDiv);

  for (let index = 0; index < nbDiv; index++) {
    let div = document.createElement("div");
    div.classList.add("memory-game");

    div.innerHTML =
      `       <div class="memory-card" onclick="flipCard(this)">
            <div class="card-inner">
                <div class="card-front"><img src="../images/question.svg" alt=""></div>
                <div class="card-back">
                  <img src="../images/${userConnect.memory}/${shuffleCards[index]}" alt="">
                </div>
            </div>
          </div>
  `;

    tabCard.appendChild(div);
  }


}


function choiceDisplay() {
  $('#imgChoix').attr("src");
  let choixmemory = $('#choixMemory').val();
  switch (choixmemory) {
    case "alphabet-scrabble": $('#imgChoix').attr("src", "../images/alphabet-scrabble/memory_detail_scrabble.png"); break;
    case "animaux": $('#imgChoix').attr("src", "../images/animaux/memory_detail_animaux.png"); break;
    case "animauxAnimes": $('#imgChoix').attr("src", "../images/animauxAnimes/memory_detail_animaux_animes.png"); break;
    case "animauxDomestiques": $('#imgChoix').attr("src", "../images/animauxdomestiques/memory_detail_animaux_domestiques.png"); break;
    case "chiens": $('#imgChoix').attr("src", "../images/chiens/memory_details_chiens.png"); break;
    case "dinosaures": $('#imgChoix').attr("src", "../images/dinosaures/memory_detail_dinosaures.png"); break;
    case "dinosauresAvecNom": $('#imgChoix').attr("src", "../images/dinosauresAvecNom/memory_details_dinosaures_avec_nom.png"); break;
    case "memory-legume": $('#imgChoix').attr("src", "../images/memory-legume/memory_detail.png"); break;

    default: $('#imgChoix').attr("src", "../images/alphabet-scrabble/memory_detail_scrabble.png");
      break;
  }
}
function recordingChoice() {
  let users = getUsers();
  let userConnect = users.find(user => user.connect === true);
  userConnect.taille = $('#choixTaille').val();
  userConnect.memory = $('#choixMemory').val();
  let dateJour = new Date();
  let options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  userConnect.date = (dateJour.toLocaleDateString("fr-FR", options));

  /***on replis le tableau et on le rend visible */
  $('#pseudoJoueur').text(userConnect.name);
  $('#scoreJoueur').text(userConnect.bestScore);
  $('#tailleChoixJoueur').text(userConnect.taille);
  $('#memoryChoixJoueur').text(userConnect.memory);
  $('#dateEnregJoueur').text(userConnect.date);
  $('#tabScore').show();
  localStorage.setItem("users", JSON.stringify(users)); // Sauvegarder !!!!

  if (userConnect.connect && !(userConnect.date === "")) {
    console.log("OK POUR JOUER");

    $('#play').attr("href", "jouer.html");
  } else { $('#play').attr('href', "#"); }



}

/*****************
 * Fin Page Profil
 ******************/

/**************** */
/*********************************************************************************************