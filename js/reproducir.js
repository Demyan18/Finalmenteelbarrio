document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('arco1');
    const boton = document.getElementById('botonAudio');

    boton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            boton.textContent = '⏸️ Pausar Canción';
        } else {
            audio.pause();
            boton.textContent = '▶️ Reproducir Canción';
        }
    });
});

  document.addEventListener("DOMContentLoaded", function () {
    const selector = document.getElementById("selectorSinopsis");
    const texto = document.getElementById("textoSinopsis");

    const sinopsis = {
      arco1: 'Una noche de fiesta termina con la muerte de un joven. Entre los principales sospechosos está alguien de su círculo más cercano. Para descubrir la verdad, debemos volver al pasado: a los días de amistades rotas, secretos callados y conflictos internos que marcaron a cada uno. "El barrio" es una historia de drama, peleas y angustia, que retrata la frustración de ser joven en un mundo que exige respuestas cuando ni siquiera uno mismo las tiene. Una mirada cruda sobre la identidad, la culpa y lo difícil que es crecer con tantas voces dentro y fuera de uno mismo.',
    //   arco2: 'En Caos Interno, los personajes enfrentan decisiones peligrosas que pondrán a prueba sus principios. Viejas heridas resurgen y alianzas inesperadas podrían marcar el destino del barrio.'
    };

    selector.addEventListener("change", function () {
      const value = this.value;

      if (sinopsis[value]) {
        texto.innerHTML = `<p>${sinopsis[value]}</p>`;
      } else {
        texto.innerHTML = `<p class="texto-default">Selecciona un arco para leer la sinopsis.</p>`;
      }
    });
  });
