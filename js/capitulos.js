// 🎵 Música por scroll con fade-in/out y 8D opcional
const audioPlayers = {};
const blocks = document.querySelectorAll('.bloque');
let currentBlock = null;
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

window.addEventListener('scroll', () => {
  let activeBlock = null;

  blocks.forEach(block => {
    const rect = block.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
    if (isVisible) activeBlock = block;
  });

  if (activeBlock !== currentBlock) {
    const newAudioSrc = activeBlock?.dataset.audio;
    const oldAudioSrc = currentBlock?.dataset.audio;

    // 🔉 Fade-out del audio anterior
    if (oldAudioSrc && audioPlayers[oldAudioSrc]) {
      const old = audioPlayers[oldAudioSrc];
      old.gain.gain.cancelScheduledValues(audioCtx.currentTime);
      old.gain.gain.setValueAtTime(old.gain.gain.value, audioCtx.currentTime);
      old.gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2);
      setTimeout(() => old.audio.pause(), 2000);
    }

    // 🔊 Reproducir nuevo si tiene audio
    if (newAudioSrc) {
      if (!audioPlayers[newAudioSrc]) {
        const audio = new Audio(newAudioSrc);
        audio.crossOrigin = "anonymous";
        audio.loop = true;

        const track = audioCtx.createMediaElementSource(audio);
        const gain = audioCtx.createGain();
        const panner = audioCtx.createStereoPanner();

        // 🎧 Configuración inicial
        gain.gain.value = 0.001;
        panner.pan.value = 0; // centrado por defecto

        // Conectar nodos
        track.connect(gain).connect(panner).connect(audioCtx.destination);

        // Guardar en cache
        audioPlayers[newAudioSrc] = { audio, gain, panner, efecto: activeBlock.dataset.efecto };

        // Si el bloque pide 8D -> paneo dinámico
        if (activeBlock.dataset.efecto === "8D") {
          setInterval(() => {
            panner.pan.value = Math.sin(Date.now() / 3000); // movimiento suave
          }, 200);
        }
      }

      const player = audioPlayers[newAudioSrc];
      player.audio.play();

      // 🌟 Fade-in hasta volumen alto (0.8 en 2s)
      player.gain.gain.cancelScheduledValues(audioCtx.currentTime);
      player.gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      player.gain.gain.exponentialRampToValueAtTime(1, audioCtx.currentTime + 2);
    }

    currentBlock = activeBlock;
  }
});


// 🎬 Intro video pantalla completa
const introOverlay = document.getElementById('introOverlay');
const introVideo = document.getElementById('introVideo');

window.addEventListener('load', () => {
  // 🔒 Bloquear scroll mientras carga o se reproduce el video
  document.body.style.overflow = "hidden";

  // 📌 Verificar si el usuario ya vio la intro
  const alreadySeen = localStorage.getItem("introSeen");

  if (alreadySeen) {
    // Si ya la vio, ocultamos directamente
    introOverlay.classList.add('hidden');
    document.body.style.overflow = "auto";
    return;
  }

  // Reproducir el video normalmente
  introVideo.volume = 1;
  introVideo.muted = false;

  introVideo.play().then(() => {
    console.log("🎬 Intro reproduciéndose");
  }).catch(err => {
    console.warn("⚠️ El navegador bloqueó el autoplay. Esperando clic...");
    introOverlay.addEventListener('click', () => {
      introVideo.play();
    });
  });

  // ❌ Bloquear retroceso/avance manual
  introVideo.addEventListener("seeking", (e) => {
    if (!introVideo.ended) {
      e.preventDefault();
      introVideo.currentTime = 0; 
    }
  });

  // ✅ Al terminar el video, ocultar overlay y habilitar scroll
  introVideo.onended = () => {
    introOverlay.classList.add('hidden');
    document.body.style.overflow = "auto";
    // 🔐 Guardar que el usuario ya vio la intro
    localStorage.setItem("introSeen", "true");
  };
});


// 🎬 Outro video pantalla completa
const outroOverlay = document.getElementById('outroOverlay');
const outroVideo = document.getElementById('outroVideo');
const outroButtons = document.getElementById('outroButtons');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const btnMenu = document.getElementById('btnMenu');

// ID del capítulo actual
const capId = "cap1"; // cambia dinámicamente si quieres
const firstCapId = "cap1"; // define el primero

// Detectar cuando llegas al final del scroll
window.addEventListener('scroll', () => {
  const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
  if (scrolledToBottom && outroOverlay.classList.contains('hidden')) {
    document.body.style.overflow = "hidden";
    outroOverlay.classList.remove('hidden');

    outroVideo.volume = 1;
    outroVideo.muted = false;

    outroVideo.play().catch(() => {
      outroOverlay.addEventListener('click', () => outroVideo.play());
    });

    outroVideo.addEventListener("seeking", (e) => {
      if (!outroVideo.ended) {
        e.preventDefault();
        outroVideo.currentTime = 0;
      }
    });

    outroVideo.onended = () => {
      // mostrar botones en lugar de cerrar overlay
      outroButtons.classList.remove('hidden');

      // si es primer capítulo -> desactivar botón anterior
      if (capId === firstCapId) {
        btnPrev.disabled = true;
        btnPrev.style.opacity = "0.5";
        btnPrev.style.cursor = "not-allowed";
      }
    };
  }
});

// 📌 Acciones de los botones
btnPrev.addEventListener("click", () => {
  if (capId !== firstCapId) {
    window.location.href = "capitulo-anterior.html"; 
  }
});
btnNext.addEventListener("click", () => {
  window.location.href = "capitulo-siguiente.html";
});
