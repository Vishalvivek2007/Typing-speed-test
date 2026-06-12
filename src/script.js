const buttons = document.querySelectorAll(".difficulty-div button , .mode-div button");
const highScore= document.querySelector(".personal-best")
const contentPara = document.querySelector(".content");
const timeDisplay = document.querySelector(".time");
const startOverlay = document.getElementById("start-overlay");
const wpmDisplay = document.querySelector(".WPM");
const accuracyDisplay = document.querySelector(".accuracy");
const finalWPM = document.querySelector(".final-wpm");
const finalACC = document.querySelector(".final-accuracy");
const correctChar=document.querySelector(".correct-characters");
const wrongChar = document.querySelector(".wrong-characters");
const typingContainer = document.querySelector(".typing-container");
const resultDiv = document.querySelector(".Results");

let DIFF = "HARD";
let MODE = "TIMED";
let START = false;
let currentIndex = 0;
let letterArr;
let timeLeft = 60;
let timer;
let correctCount = 0;
let wrongCount = 0;



function toggleTypingContainer(){
  typingContainer.classList.toggle("hidden");
}



function displayResult(){
  toggleTypingContainer();
  resultDiv.style.display="flex";
  finalWPM.textContent=Math.round((correctCount / 5) / ((60-timeLeft)/60));
  finalACC.textContent=Math.round((correctCount / (correctCount+wrongCount)) * 100);
  correctChar.textContent =  correctCount;
  wrongChar.textContent = wrongCount;
  if(+finalWPM.textContent > +highScore.textContent){
    highScore.textContent=finalWPM.textContent;
  }
  currentIndex = 0;
  timeLeft=60;
  correctCount=0;
  wrongCount=0;
  DIFF="HARD";
  MODE="TIMED";
}

function updateStats() {
  const totalTyped = correctCount + wrongCount;

  if (totalTyped > 0) {
    const accuracy = Math.round((correctCount / totalTyped) * 100);
    accuracyDisplay.innerText = `${accuracy}%`;
  }

  const timeElapsed = 60 - timeLeft;
  if (timeElapsed > 0) {
    const timeInMinutes = timeElapsed / 60;
    const wpm = Math.round((correctCount / 5) / timeInMinutes);
    wpmDisplay.innerText = wpm;
  }
}



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
      displayResult();
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
      
      if (letterArr[currentIndex].classList.contains("correct")) {
        correctCount--;
        letterArr[currentIndex].classList.remove("correct");
      } else if (letterArr[currentIndex].classList.contains("wrong")) {
        wrongCount--;
        letterArr[currentIndex].classList.remove("wrong");
      }
      
      letterArr[currentIndex].className = "char active"; 
      updateStats();
    }
  } else if (char.length === 1) { 
    letterArr[currentIndex].classList.remove("active");
    
    if (char === letterArr[currentIndex].innerText) {
      letterArr[currentIndex].classList.add("correct");
      correctCount++;
    } else {
      letterArr[currentIndex].classList.add("wrong");
      wrongCount++;
    }
    
    currentIndex++;
    updateStats();
    
    if (currentIndex < letterArr.length) {
      letterArr[currentIndex].classList.add("active");
    } else {
      clearInterval(timer);
      START = false;
      displayResult();
    }
  }
});

const restartBTN = document.getElementById("restart-btn");
restartBTN.addEventListener("click", ()=>{
  toggleTypingContainer();
  startOverlay.classList.remove("hidden");
  resultDiv.style.display="none";
});


