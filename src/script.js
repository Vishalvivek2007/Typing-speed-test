const buttons = document.querySelectorAll(".difficulty-div button , .mode-div button");
const contentPara = document.querySelector(".content");
const timeDisplay = document.querySelector(".time");
const startOverlay = document.getElementById("start-overlay");

let DIFF = "HARD";
let MODE = "TIMED";
let START = false;
let currentIndex = 0;
let letterArr;
let timeLeft = 60;
let timer;

function startTest() {
  let contentText = contentPara.innerText;
  let contentArr = [...contentText];
  contentPara.innerHTML = "";
  
  contentArr.forEach((letter) => {
    const newLetter = document.createElement("span");
    newLetter.innerText = letter;
    newLetter.classList.add("char");
    contentPara.append(newLetter);
  });
  
  letterArr = document.querySelectorAll("span");
  letterArr[0].classList.add("active");
  
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timeDisplay.innerText = `0:${timeLeft.toString().padStart(2, '0')}`;
    } else {
      clearInterval(timer);
      START = false;
    }
  }, 1000);
}

buttons.forEach(btn => {
  btn.addEventListener("click", (event) => {
    const clickedBtn = event.currentTarget;
    const parent = clickedBtn.parentElement;

    parent.querySelectorAll("button").forEach(b => {
      b.classList.remove("blue-selected");
    });
    clickedBtn.classList.add("blue-selected");
  });
});

startOverlay.addEventListener("click", () => {
  startOverlay.classList.add("hidden");
  START = true;
  startTest();
});

window.addEventListener("keydown", (event) => {
  if (!START) return;
  
  const char = event.key;
  
  if (char === 'Backspace') {
    if (currentIndex > 0) {
      letterArr[currentIndex].classList.remove("active");
      currentIndex--;
      letterArr[currentIndex].className = "char active"; 
    }
  } else if (char.length === 1) { 
    letterArr[currentIndex].classList.remove("active");
    
    if (char === letterArr[currentIndex].innerText) {
      letterArr[currentIndex].classList.add("correct");
    } else {
      letterArr[currentIndex].classList.add("wrong");
    }
    
    currentIndex++;
    
    if (currentIndex < letterArr.length) {
      letterArr[currentIndex].classList.add("active");
    } else {
      clearInterval(timer);
      START = false;
    }
  }
});