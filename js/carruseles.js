  let indice = 0;
  const carrusel = document.getElementById('carrusel');
  const total = carrusel.children.length;

  function moverCarrusel(direccion) {
    indice = (indice + direccion + total) % total;
    actualizarCarrusel();
  }

  function actualizarCarrusel() {
    carrusel.style.transform = `translateX(-${indice * 100}%)`;
  }

  // Autoplay cada 5 segundos
  setInterval(() => {
    moverCarrusel(1);
  }, 3000);
