const buttons = document.querySelectorAll(".difficulty-div button , .mode-div button");

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


const startOverlay = document.getElementById("start-overlay");

startOverlay.addEventListener("click", () => {
  startOverlay.classList.add("hidden");
});



