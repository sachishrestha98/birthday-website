const flame = document.getElementById("flame");
const message = document.getElementById("message");
const instruction = document.getElementById("instruction");

// Calm piano background
const pianoMusic = new Audio("https://cdn.pixabay.com/audio/2022/03/25/audio_c8c1467f25.mp3");
pianoMusic.loop = true;
pianoMusic.volume = 0.3;
pianoMusic.play();

// Mic setup
navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then(stream => {
    const audioContext = new AudioContext();
    const mic = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    mic.connect(analyser);
    analyser.fftSize = 256;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function detectBlow() {
      analyser.getByteFrequencyData(dataArray);
      let volume = dataArray.reduce((a, b) => a + b) / dataArray.length;

      // If loud enough = blowing
      if (volume > 35 && flame.style.display !== "none") {
        blowCandle();
      }

      requestAnimationFrame(detectBlow);
    }

    detectBlow();
  })
  .catch(err => {
    instruction.innerText = "Mic access denied 😢 — click instead to blow the candle.";
    flame.addEventListener("click", blowCandle);
  });

function blowCandle() {
  flame.style.display = "none";
  instruction.innerText = "✨ Candle blown!";

  // Confetti blast 🎉
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 }
  });

  // Show birthday message
  setTimeout(() => {
    message.classList.remove("hidden");
  }, 800);
}
