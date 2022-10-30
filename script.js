let questionIndex;
let questionsLength;

const main = document.getElementById("main");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const submit = document.getElementById("submit");
const input = document.getElementById("answer");
const answers = document.getElementById("answers");
const messagesWindow = document.getElementById("messagesWindow");
const chat = document.getElementById("chat");
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

askQuestion = (antagoniste, questionIndex) => {
  const questions = [
    "Tout d'abord, quel est le prénom de la personne avec laquelle la situation contrariante dont tu as envie de me parler est arrivée ?",
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
      " est différent de toi ?",
    "Ok. Et quels sont vos points communs ?",
    "D'accord... Comment cela serait pour toi de te sentir comme " +
      antagoniste +
      " dans cette situation ?",
    "J'imagine oui... Comment est ce que tu te sens ici et maintenant ?",
    "Je comprends... Je te félicite pour ton travail sur ta colère. ce n'est pas toujours aisé de se remettre en question lorsque nous sommes en colère, alors je te félicite pour cet effort. Bravo ! Et à bientôt !",
  ];
  questionsLength = questions.length;
  return questions[questionIndex];
};

const init = () => {
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
  localStorage.clear();
};

const startDisplay = () => {
  main.style.backgroundColor = "#E0E0E0";
  chat.style.display = "block";
  start.style.display = "none";
  messagesWindow.style.display = "block";
  stop.style.display = "block";
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
  robotAnswer.innerHTML = askQuestion("", questionIndex);
};

const dialog = () => {
  start.addEventListener("click", () => {
    startDisplay();
  });
  submit.addEventListener("click", () => {
    let myAnswer = answers.appendChild(document.createElement("p"));
    myAnswer.classList.add("myAnswer");
    myAnswer.innerHTML = input.value;
    if (questionIndex == 0) {
      localStorage.setItem("antagoniste", input.value);
    }
    myAnswer.scrollIntoView({ behavior: "smooth" });
    input.value = "";
    questionIndex++;
    if (
      askQuestion(localStorage.getItem("antagoniste"), questionIndex) !=
      undefined
    ) {
      setTimeout(() => {
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
        let robotAnswer = robotLine.appendChild(document.createElement("p"));
        robotAnswer.classList.add("robotAnswer");
        robotAnswer.innerHTML = askQuestion(
          localStorage.getItem("antagoniste"),
          questionIndex
        );
        robotAnswer.scrollIntoView({ behavior: "smooth" });
        if (questionIndex === questionsLength - 1) {
          stop.style.display = "none";
          submit.innerHTML = "Fin";
        }
      }, 1500);
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
