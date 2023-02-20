import { random, select, selectAll } from "../../utils/ts/funcs.js";

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
  const tttGrid = select("#ttt-grid")!;
  const tttBoxes = selectAll(".ttt-box");
  const tttInfo = select("#ttt-info")!;
  const tttScoreX = select("#ttt-score-x")!;
  const tttScoreO = select("#ttt-score-o")!;
  const tttReplay = select("#ttt-replay")!;
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

  const ticTacToeInfos = () => {
    tttScoreX.textContent = `Joueur X : ${scoreTttX}`;
    tttScoreO.textContent = `Joueur O : ${scoreTttO}`;
    tttInfo.textContent = infoTtt;
  };
  const ticTacToeReset = () => {
    tttBoxes.forEach((box) => (box.textContent = ""));
    tttEndgame = false;
    tttTurn = false;
    infoTtt = "👀";
    ticTacToeInfos();
  };
  const ticTacToeReplay = () => {
    scoreTttX = 0;
    scoreTttO = 0;
    ticTacToeReset();
  };
  const ticTacToe = (e: Event) => {
    const cible = e.target as HTMLDivElement;
    if (
      !cible.classList.contains("ttt-box") ||
      cible.textContent !== "" ||
      tttEndgame
    )
      return;

    tttTurn = !tttTurn;
    let tttPlayer = tttTurn ? "X" : "O";
    cible.textContent = tttPlayer;

    for (const win of tttWins) {
      if (
        tttBoxes[win[0]].textContent &&
        tttBoxes[win[0]].textContent === tttBoxes[win[1]].textContent &&
        tttBoxes[win[0]].textContent === tttBoxes[win[2]].textContent
      ) {
        infoTtt = `Bravo Joueur ${tttPlayer} ! 🏅`;
        tttEndgame = true;
        tttPlayer === "X" ? scoreTttX++ : scoreTttO++;
        ticTacToeInfos();
        setTimeout(ticTacToeReset, 2000);
      }
    }

    if (tttBoxes.every((box) => box.textContent !== "") && !tttEndgame) {
      infoTtt = `Match Nul. 😐`;
      ticTacToeInfos();
      setTimeout(ticTacToeReset, 2000);
    }
  };

  ticTacToeInfos();
  tttGrid.addEventListener("click", ticTacToe);
  tttReplay.addEventListener("click", ticTacToeReplay);
}
