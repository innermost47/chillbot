let questionIndex;
let questionsLength;
let mode;
let begin = true;

const main = document.getElementById("main");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const submit = document.getElementById("submit");
const input = document.getElementById("answer");
const answers = document.getElementById("answers");
const messagesWindow = document.getElementById("messagesWindow");
const chat = document.getElementById("chat");
const end = document.getElementById("end");
const chillBot = document.getElementById("chillBot");
const startContainer = document.getElementById("startContainer");
const footer = document.getElementById("footer");
const page = document.getElementById("page");
const modeChoices = document.getElementById("modeChoices");
const sendIcon = `<svg
xmlns="http://www.w3.org/2000/svg"
width="16"
height="16"
fill="currentColor"
class="bi bi-send-fill"
viewBox="0 0 16 16"
>
<path
  d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"
></path>
</svg>`;
const awaiter = `<div class="ticontainer">
<div class="tiblock">
  <div class="tidot"></div>
  <div class="tidot"></div>
  <div class="tidot"></div>
</div>
</div>`;

askQuestion = (antagoniste, questionIndex, mode) => {
  const questionsAnger = [
    "Tout d'abord, quel est le prénom de la personne avec laquelle la situation contrariante est arrivée ?",
    "Alors dis moi, quelle est la situation qui t'a mis en colère avec " +
      antagoniste +
      " ? Décris la moi de la manière la plus objective possible: ",
    "Ok... J'imagine qu'en effet tu ais pu te sentir en colère... Et en même temps... J'ai envie de te poser une petite question... Avec toute ma bienveillance... Si tu prends le temps d'y réfléchir... Est ce que c'est grave ?",
    "D'après toi, comment " + antagoniste + " perçoit cette situation ? ",
    "D'après toi, quelles sont les pensées de " +
      antagoniste +
      " vis à vis de cette situation ?",
    "Quelles sont ses émotions possibles ?",
    "En effet c'est probable... D'après toi, qu'est ce qui est important pour " +
      antagoniste +
      " dans cette situation ?",
    "C'est une hypothèse oui... Et sinon, que penses tu pouvoir apprendre de " +
      antagoniste +
      " dans cette situation ?",
    "En effet, c'est une bonne piste... Dis moi, en quoi " +
      antagoniste +
      " est différent.e de toi ?",
    "Ok. Et quels sont vos points communs ?",
    "D'accord... Comment cela serait pour toi de te sentir comme " +
      antagoniste +
      " dans cette situation ?",
    "J'imagine oui... Comment est ce que tu te sens ici et maintenant ?",
    "Je comprends... Je te félicite pour ton travail sur ta colère, ce n'est pas toujours aisé de se remettre en question lorsque nous sommes en colère, alors je te félicite pour cet effort. Bravo ! Et à bientôt !",
  ];
  const questionsRestructuration = [
    "Tout d'abord, peux tu me décrire de manière subjective la situation qui t'a contrarié ?",
    "Mmm je vois... J'imagine en effet que tu ais pû te sentir concerné... Dis moi, quelles sont les émotions que tu as ressenti ?",
    "Ok... En effet... J'imagine... Sur une échelle de 1 à 10, quelle a été l'intensité de ces émotions ?",
    "D'accord... Maintenant, quelles ont été les pensées qui ont précédées, accompagnées ou suivies l'émotion ?",
    "Très bien... C'est en effet une hypothèse... Et dis moi, sur une échelle de 1 à 10, quel degré de croyance accordes tu à ces pensées ? 1 étant très faible, 10 tu y accordes une croyance absolue.",
    "Super... Merci... Maintenant, si tu devais changer de perspective, de point de vue sur la situation, quelles sont les autres hypothèses possibles d'après toi ?",
    "D'accord... Je te félicite pour ce travail, cela demande de l'effort de voir les choses sous un autre angle lorsque nous sommes sous le coup de l'émotion, alors bravo... Concernant ces hypothèses alternatives, sur une échelle de 1 à 10, quel degré de croyance accordes tu à ces autres points de vue ? 1 étant très faible, 10 tu y accordes une croyance absolue.",
    "Merci à toi... Comment est ce que tu te sens ici et maintenant ?",
    "J'imagine oui..  . Je suis ravi et touché que tu fasses ce travail sur tes pensées. Encore une fois je te félicite pour cet effort, c'est vraiment chouette. A bientôt !",
  ];
  switch (mode) {
    case "restructuration":
      questionsLength = questionsRestructuration.length;
      return questionsRestructuration[questionIndex];
    case "colere":
      questionsLength = questionsAnger.length;
      return questionsAnger[questionIndex];
  }
};

const init = () => {
  footer.style.display = "block";
  page.style.height = "calc(100vh - " + footer.offsetHeight + "px)";
  startContainer.style.display = "flex";
  main.style.backgroundColor = "#00B5B5";
  stop.style.display = "none";
  messagesWindow.style.display = "none";
  start.style.display = "block";
  submit.innerHTML = sendIcon;
  submit.style.display = "none";
  input.style.display = "none";
  answers.innerHTML = "";
  answers.style.display = "none";
  questionIndex = 0;
  chat.style.display = "none";
  end.style.display = "none";
  chillBot.style.display = "block";
  localStorage.clear();
  begin = true;
  modeChoices.style.display = "none";
};

const createChoice = (id, html) => {
  let element = modeChoices.appendChild(document.createElement("p"));
  element.classList.add("modeChoice");
  element.setAttribute("id", id);
  element.innerHTML = html;
  let elementId = document.getElementById(id);
  elementId.addEventListener("click", () => {
    input.value = id;
    submit.click();
    modeChoices.style.display = "none";
    while (modeChoices.firstChild) {
      modeChoices.removeChild(modeChoices.firstChild);
    }
  });
};

const startDisplay = () => {
  modeChoices.style.display = "flex";
  page.style.height = "100vh";
  footer.style.display = "none";
  startContainer.style.display = "none";
  chillBot.style.display = "none";
  main.style.backgroundColor = "#E0E0E0";
  chat.style.display = "block";
  start.style.display = "none";
  messagesWindow.style.display = "block";
  stop.style.display = "none";
  submit.style.display = "block";
  input.style.display = "block";
  answers.style.display = "flex";
  let robotLine = answers.appendChild(document.createElement("div"));
  robotLine.classList.add("robotLine");
  let imageBackground = robotLine.appendChild(document.createElement("div"));
  imageBackground.classList.add("imageBackground");
  let robotImage = imageBackground.appendChild(document.createElement("img"));
  robotImage.src = "assets/logo.svg";
  robotImage.classList.add("icon");
  let robotAnswer = robotLine.appendChild(document.createElement("p"));
  robotAnswer.classList.add("robotAnswer");
  robotAnswer.innerHTML =
    "Bonjour et bienvenue, je suis ChillBot et je suis là pour t'accompagner dans la gestion de tes émotions. Je suis très heureux d'être là à tes côtés. Pour commencer, je te laisse me dire, sur quoi souhaites tu travailler ? Si à tout moment tu souhaites mettre un terme à notre discussion, tape tout simplement 'stop' et envoie moi cette réponse.";
  createChoice("colere", "Travailler sur ma colère");
  createChoice("restructuration", "Faire de la restructuration cognitive");
};

const dialog = () => {
  start.addEventListener("click", () => {
    startDisplay();
  });
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    if (begin) {
      mode = input.value;
      begin = false;
      questionIndex--;
    }
    if (input.value == "") {
      return;
    } else if (input.value === "stop") {
      input.value = "";
      init();
      return;
    }
    if (questionIndex != -1) {
      let myAnswer = answers.appendChild(document.createElement("p"));
      myAnswer.classList.add("myAnswer");
      myAnswer.innerHTML = input.value;
      myAnswer.scrollIntoView({ behavior: "smooth" });
    }
    questionIndex++;
    if (askQuestion("", questionIndex, mode) != undefined) {
      if (questionIndex == 1 && mode == "colere") {
        localStorage.setItem("antagoniste", input.value);
      }
      input.value = "";
      let robotLine = answers.appendChild(document.createElement("div"));
      robotLine.classList.add("robotLine");
      let imageBackground = robotLine.appendChild(
        document.createElement("div")
      );
      imageBackground.classList.add("imageBackground");
      let robotImage = imageBackground.appendChild(
        document.createElement("img")
      );
      robotImage.src = "assets/logo.svg";
      robotImage.classList.add("icon");
      let robotAnswer = robotLine.appendChild(document.createElement("div"));
      robotAnswer.innerHTML = awaiter;
      robotAnswer.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        robotAnswer.innerHTML = "";
        robotAnswer = robotLine.appendChild(document.createElement("p"));
        robotAnswer.classList.add("robotAnswer");
        robotAnswer.innerHTML = askQuestion(
          localStorage.getItem("antagoniste"),
          questionIndex,
          mode
        );
        robotAnswer.scrollIntoView({ behavior: "smooth" });
        if (questionIndex === questionsLength - 1) {
          stop.style.display = "none";
          submit.style.display = "none";
          input.style.display = "none";
          setTimeout(() => {
            end.style.display = "block";
          }, 1500);
        }
      }, askQuestion(localStorage.getItem("antagoniste"), questionIndex, mode).length * 20);
    } else {
      init();
    }
  });
  stop.addEventListener("click", () => {
    if (confirm("Es tu sûr de vouloir arrêter ?")) {
      init();
    }
  });
};

init();
dialog();
