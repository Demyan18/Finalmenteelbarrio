document.addEventListener("DOMContentLoaded", () => {
    const audios = document.querySelectorAll("audio");

    audios.forEach(audio => {
        audio.addEventListener("ended", () => {
            const btn = audio.previousElementSibling;
            if (btn && btn.classList.contains("btn-audio")) {
                btn.textContent = '▶️ Reproducir';
            }
        });
    });
});

function togglePlay(button) {
    const audio = button.nextElementSibling;

    // Pausar todos los audios y resetear botones
    document.querySelectorAll("audio").forEach(a => {
        const otherBtn = a.previousElementSibling;
        if (a !== audio) {
            a.pause();
            if (otherBtn && otherBtn.classList.contains("btn-audio")) {
                otherBtn.textContent = '▶️ Reproducir';
            }
        }
    });

    // Reproducir o pausar el actual
    if (audio.paused) {
        audio.play();
        button.textContent = '⏸️ Pausar';
    } else {
        audio.pause();
        button.textContent = '▶️ Reproducir';
    }

    // Asegurarse de cambiar el texto si se pausa desde fuera (manualmente)
    audio.onpause = () => {
        const isStillPlaying = !audio.ended && audio.currentTime > 0;
        if (isStillPlaying) {
            button.textContent = '▶️ Reproducir';
        }
    };
}
