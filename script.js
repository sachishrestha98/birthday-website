const gameArea = document.getElementById("game-area");
const message = document.getElementById("message");

let poppedCount = 0;
const totalBalloons = 5;

// Create and add balloons to the page
for (let i = 0; i < totalBalloons; i++) {
  const balloon = document.createElement("div");
  balloon.classList.add("balloon");
  balloon.addEventListener("click", () => {
    if (!balloon.classList.contains("popped")) {
      balloon.classList.add("popped");
      balloon.style.backgroundColor = "#eee";
      balloon.style.cursor = "default";
      poppedCount++;

      if (poppedCount === totalBalloons) {
        showMessage();
      }
    }
  });
  gameArea.appendChild(balloon);
}

function showMessage() {
  message.classList.remove("hidden");

  // 🎉 Launch confetti
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 }
  });
}
