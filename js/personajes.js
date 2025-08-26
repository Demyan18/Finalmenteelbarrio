function togglePersonajes() {
        const grid = document.getElementById("personajesGrid");
        const btn = document.getElementById("toggleBtn");

        if (grid.style.display === "none" || grid.style.display === "") {
            grid.style.display = "grid";
            btn.textContent = "Ocultar personajes";
        } else {
            grid.style.display = "none";
            btn.textContent = "Ver personajes";
        }
    }