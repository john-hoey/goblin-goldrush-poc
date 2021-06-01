document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".grid div");
  const skelesLeft = document.querySelectorAll(".skele-left");
  const skelesRight = document.querySelectorAll(".skele-right");
  const rocksLeft = document.querySelectorAll(".rock-left");
  const rocksRight = document.querySelectorAll(".rock-right");
  const timeLeft = document.querySelector("#time-left");
  const result = document.querySelector("#result");
  const startBtn = document.querySelector("#button");
  const width = 9;
  let currentIndex = 76;
  let currentTime = 20;
  let timerId;
  //render goblin on starting block

  squares[currentIndex].classList.add("goblin");

  //write a function that will move the goblin

  const moveGoblin = (e) => {
    squares[currentIndex].classList.remove("goblin");
    switch (e.keyCode) {
      case 37:
        if (currentIndex % width !== 0) currentIndex -= 1;
        break;
      case 38:
        if (currentIndex - width >= 0) currentIndex -= width;
        break;
      case 39:
        if (currentIndex % width < width - 1) currentIndex += 1;
        break;
      case 40:
        if (currentIndex + width < width * width) currentIndex += width;
        break;
    }
    squares[currentIndex].classList.add("goblin");
    lose();
    win();
  };

  //move skeles
  const autoMoveSkeles = () => {
    skelesLeft.forEach((skeleLeft) => moveSkeleLeft(skeleLeft));
    skelesRight.forEach((skeleRight) => moveSkeleRight(skeleRight));
  };

  // move the skele left on a time loop
  const moveSkeleLeft = (skeleLeft) => {
    switch (true) {
      case skeleLeft.classList.contains("s1"):
        skeleLeft.classList.remove("s1");
        skeleLeft.classList.add("s2");
        break;
      case skeleLeft.classList.contains("s2"):
        skeleLeft.classList.remove("s2");
        skeleLeft.classList.add("s3");
        break;
      case skeleLeft.classList.contains("s3"):
        skeleLeft.classList.remove("s3");
        skeleLeft.classList.add("s1");
        break;
    }
  };

  //move the skele right on a time loop

  const moveSkeleRight = (skeleRight) => {
    switch (true) {
      case skeleRight.classList.contains("s1"):
        skeleRight.classList.remove("s1");
        skeleRight.classList.add("s3");
        break;
      case skeleRight.classList.contains("s2"):
        skeleRight.classList.remove("s2");
        skeleRight.classList.add("s1");
        break;
      case skeleRight.classList.contains("s3"):
        skeleRight.classList.remove("s3");
        skeleRight.classList.add("s2");
        break;
    }
  };

  //auto move rocks
  const autoMoveRocks = () => {
    rocksLeft.forEach((rockLeft) => moveRockLeft(rockLeft));
    rocksRight.forEach((rockRight) => moveRockRight(rockRight));
  };

  // move the rock left on a time loop
  const moveRockLeft = (rockLeft) => {
    switch (true) {
      case rockLeft.classList.contains("r1"):
        rockLeft.classList.remove("r1");
        rockLeft.classList.add("r2");
        break;
      case rockLeft.classList.contains("r2"):
        rockLeft.classList.remove("r2");
        rockLeft.classList.add("r3");
        break;
      case rockLeft.classList.contains("r3"):
        rockLeft.classList.remove("r3");
        rockLeft.classList.add("r4");
        break;
      case rockLeft.classList.contains("r4"):
        rockLeft.classList.remove("r4");
        rockLeft.classList.add("r5");
        break;
      case rockLeft.classList.contains("r5"):
        rockLeft.classList.remove("r5");
        rockLeft.classList.add("r1");
        break;
    }
  };

  //move the rock right on a time loop

  const moveRockRight = (rockRight) => {
    switch (true) {
      case rockRight.classList.contains("r1"):
        rockRight.classList.remove("r1");
        rockRight.classList.add("r5");
        break;
      case rockRight.classList.contains("r2"):
        rockRight.classList.remove("r2");
        rockRight.classList.add("r1");
        break;
      case rockRight.classList.contains("r3"):
        rockRight.classList.remove("r3");
        rockRight.classList.add("r2");
        break;
      case rockRight.classList.contains("r4"):
        rockRight.classList.remove("r4");
        rockRight.classList.add("r3");
        break;
      case rockRight.classList.contains("r5"):
        rockRight.classList.remove("r5");
        rockRight.classList.add("r4");
        break;
    }
  };

  //rules to win goblin goldrush
  const win = () => {
    if (squares[4].classList.contains("goblin")) {
      result.innerHTML = "You Won!";
      squares[currentIndex].classList.remove("goblin");
      clearInterval(timerId);
      document.removeEventListener("keyup", moveGoblin);
    }
  };

  //rules to lose goblin goldrush
  const lose = () => {
    if (
      currentTime === 0 ||
      squares[currentIndex].classList.contains("s1") ||
      squares[currentIndex].classList.contains("r5") ||
      squares[currentIndex].classList.contains("r4")
    ) {
      result.innerHTML = "You Lose!";
      squares[currentIndex].classList.remove("goblin");
      clearInterval(timerId);
      document.removeEventListener("keyup", moveGoblin);
    }
  };

  // move the goblin when its on the rock moving left
  const moveWithRockLeft = () => {
    if (currentIndex >= 27 && currentIndex < 35) {
      squares[currentIndex].classList.remove("goblin");
      currentIndex += 1;
      squares[currentIndex].classList.add("goblin");
    }
  };

  // move the goblin when its on the rock moving right
  const moveWithRockRight = () => {
    if (currentIndex > 18 && currentIndex <= 26) {
      squares[currentIndex].classList.remove("goblin");
      currentIndex -= 1;
      squares[currentIndex].classList.add("goblin");
    }
  };

  //all the functions that move pieces

  const movePieces = () => {
    currentTime--;
    timeLeft.textContent = currentTime;
    autoMoveSkeles();
    autoMoveRocks();
    moveWithRockLeft();
    moveWithRockRight();
    lose();
  };

  // to start and pause the game
  startBtn.addEventListener("click", () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = false;
    } else {
      timerId = setInterval(movePieces, 1000);
      document.addEventListener("keyup", moveGoblin);
    }
  });
});
