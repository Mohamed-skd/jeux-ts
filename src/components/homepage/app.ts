import {
  create,
  formatText,
  random,
  select,
  selectAll,
} from "../../utils/ts/funcs.js";
import { affiliationArticle, affiliationList } from "../../utils/ts/types.js";

export default function homepage() {
  // guess number
  const guessForm = select("#guess-form")!;
  const guessInfo = select("#guess-form p")!;
  const guessInput = select("#guess-input") as HTMLInputElement;
  let guessRandom = random(101);
  let guessAttempt = 10;
  let infoGuess = `Vous devez deviner un nombre entre 0 et 100, vous avez droit à ${guessAttempt} tentatives.`;

  const guessReplay = () => {
    guessInput.disabled = true;
    setTimeout(() => {
      guessInput.disabled = false;
      guessRandom = random(101);
      guessAttempt = 10;
      infoGuess = `Vous devez deviner un nombre entre 0 et 100, vous avez droit à ${guessAttempt} tentatives.`;
      guessInfo.textContent = infoGuess;
    }, 2000);
  };
  const guessNumber = (e: Event) => {
    e.preventDefault();

    const choice = parseInt(guessInput.value);
    if (isNaN(choice) || choice < 0 || choice > 100) {
      infoGuess = "Attention ! Vous devez choisir un nombre entre 0 et 100. 👀";
      guessInfo.textContent = infoGuess;
      return;
    }

    const win = choice === guessRandom && guessAttempt > 1;
    const lose = choice !== guessRandom && guessAttempt === 1;
    const small = choice < guessRandom;
    const big = choice > guessRandom;

    switch (true) {
      case win:
        infoGuess = `🏅 Bravo ! Vous avez trouvé ${guessRandom}`;
        guessReplay();
        break;
      case lose:
        infoGuess = `❌ Dommage. Il fallait trouver ${guessRandom}`;
        guessReplay();
        break;
      case small:
        guessAttempt--;
        infoGuess = `${choice} est trop petit. Il vous reste ${guessAttempt} tentatives.`;
        break;
      case big:
        guessAttempt--;
        infoGuess = `${choice} est trop grand. Il vous reste ${guessAttempt} tentatives.`;
        break;
    }

    guessInfo.textContent = infoGuess;
    guessInput.value = "";
    guessInput.focus();
  };

  guessInfo.textContent = infoGuess;
  guessForm.addEventListener("submit", guessNumber);

  // tic tac toe
  const tttGrid = select("#ttt-game > .grid")!;
  const tttBoxes = selectAll("#ttt-game .box");
  const tttInfo = select("#ttt-game .info")!;
  const tttScoreX = select("#ttt-score-x")!;
  const tttScoreO = select("#ttt-score-o")!;
  const tttReplay = select("#ttt-game .replay")!;
  const tttWins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let tttTurn = false;
  let tttEndgame = false;
  let scoreTttX = 0;
  let scoreTttO = 0;
  let infoTtt = "👀";

  const tttInfos = () => {
    tttScoreX.textContent = `Joueur X : ${scoreTttX}`;
    tttScoreO.textContent = `Joueur O : ${scoreTttO}`;
    tttInfo.textContent = infoTtt;
  };
  const tttReset = () => {
    tttBoxes.forEach((box) => (box.textContent = ""));
    tttEndgame = false;
    tttTurn = false;
    infoTtt = "👀";
    tttInfos();
  };
  const replayTtt = () => {
    scoreTttX = 0;
    scoreTttO = 0;
    tttReset();
  };
  const ticTacToe = (e: Event) => {
    const target = e.target as HTMLDivElement;
    if (
      !target.classList.contains("box") ||
      target.textContent !== "" ||
      tttEndgame
    )
      return;

    tttTurn = !tttTurn;
    const player = tttTurn ? "X" : "O";
    target.textContent = player;

    for (const win of tttWins) {
      if (
        tttBoxes[win[0]].textContent &&
        tttBoxes[win[0]].textContent === tttBoxes[win[1]].textContent &&
        tttBoxes[win[0]].textContent === tttBoxes[win[2]].textContent
      ) {
        infoTtt = `Bravo Joueur ${player} ! 🏅`;
        tttEndgame = true;
        player === "X" ? scoreTttX++ : scoreTttO++;
        tttInfos();
        setTimeout(tttReset, 2000);
      }
    }

    if (tttBoxes.every((box) => box.textContent !== "") && !tttEndgame) {
      infoTtt = `Match Nul. 😐`;
      tttInfos();
      setTimeout(tttReset, 2000);
    }
  };

  tttInfos();
  tttGrid.addEventListener("click", ticTacToe);
  tttReplay.addEventListener("click", replayTtt);

  // rock, paper, scissors
  const rpsPlayer = select("#rps-player .move")!;
  const rpsPlayerEmot = select("#rps-player .emot")!;
  const rpsInfo = select("#rps-info p")!;
  const rpsBot = select("#rps-bot .move")!;
  const rpsOptions = select("#rps-options")!;
  const rpsOptionsBt = selectAll("#rps-options .bt")!;
  const rpsScorePlayer = select("#rps-score-player")!;
  const rpsScoreBot = select("#rps-score-bot")!;
  const rpsReplay = select("#rps-game .replay")!;
  const rpsWins = [
    [0, 2],
    [1, 0],
    [2, 1],
  ];
  let infoRps = "👀";
  let scoreRpsPlayer = 0;
  let scoreRpsBot = 0;

  const rpsInfos = () => {
    const emot = scoreRpsPlayer >= scoreRpsBot ? "😊" : "🥲";
    rpsInfo.textContent = infoRps;
    rpsPlayerEmot.textContent = emot;
    rpsScorePlayer.textContent = `${emot} : ${scoreRpsPlayer}`;
    rpsScoreBot.textContent = `🤖 : ${scoreRpsBot}`;
  };
  const replayRps = () => {
    infoRps = "👀";
    rpsPlayer.textContent = "";
    rpsBot.textContent = "";
    scoreRpsPlayer = 0;
    scoreRpsBot = 0;
    rpsInfos();
  };
  const rockPaperScissors = (e: Event) => {
    const target = e.target as HTMLButtonElement;

    if (!target.classList.contains("bt")) return;
    const player = target.textContent;
    const bot = rpsOptionsBt[random(3)].textContent;
    rpsPlayer.textContent = player;
    rpsBot.textContent = bot;

    for (const win of rpsWins) {
      if (
        player === rpsOptionsBt[win[0]].textContent &&
        bot === rpsOptionsBt[win[1]].textContent
      ) {
        infoRps = "Gagné 🏅";
        scoreRpsPlayer++;
        break;
      } else if (
        player === rpsOptionsBt[win[1]].textContent &&
        bot === rpsOptionsBt[win[0]].textContent
      ) {
        infoRps = "Perdu ❌";
        scoreRpsBot++;
        break;
      } else {
        infoRps = "Égalité 😐";
      }
    }

    rpsInfos();
  };

  rpsInfos();
  rpsOptions.addEventListener("click", rockPaperScissors);
  rpsReplay.addEventListener("click", replayRps);

  // snake

  // connect 4

  // play
  const playGrid = select("#play > .grid")!;

  const affiliationElem = (elem: affiliationArticle) => {
    const { name, img, link } = elem;
    const article = create("article");
    const artLink = create("a", { href: link, target: "_blank" });
    const artImg = create("img", {
      src: img,
      alt: name,
      loading: "lazy",
      width: "250",
      height: "250",
    });
    const artName = create("p", { class: "link" });

    artName.textContent = formatText(name);
    artLink.append(artImg, artName);
    article.append(artLink);

    return article;
  };
  const playDatasFetch = async () => {
    try {
      const playDatas = await fetch("data/play.json");
      const playDatasListe: affiliationList = await playDatas.json();

      playDatasListe.map((data) => playGrid.append(affiliationElem(data)));
    } catch (err) {
      console.error(err);
    }
  };

  playDatasFetch();
}
