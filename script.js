document.addEventListener("DOMContentLoaded", () => {
    // ========================================
    // PERSONALIZA AQUÍ LOS DATOS DE LA FIESTA
    // ========================================
    const cumpleanos = {
        nombre: "EVA LUCIA",
        fecha: "Jueves 17 de diciembre de 2026",
        hora: "10:30 de la mañana",
        lugar: "El patio de la escuela en el recreo",
        direccion: "Colegio Juana de Arco"
    };

    // Mostrar los datos en la invitación
    document.getElementById("nombre").textContent = cumpleanos.nombre;
    document.getElementById("fecha").textContent = cumpleanos.fecha;
    document.getElementById("hora").textContent = cumpleanos.hora;
    document.getElementById("lugar").textContent = cumpleanos.lugar;
    document.getElementById("direccion").textContent = cumpleanos.direccion;

    // Crear enlace de Google Maps con la dirección
    const botonMapa = document.getElementById("botonMapa");
    const direccionCompleta =
        cumpleanos.lugar + ", " + cumpleanos.direccion;

    botonMapa.href =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(direccionCompleta);

    // Elementos principales
    const botonAbrir = document.getElementById("abrir");
    const portada = document.getElementById("portada");
    const musica = document.getElementById("musicaFondo");
    const botonMusica = document.getElementById("botonMusica");

    let invitacionAbierta = false;

    // Actualizar el botón de música
    function actualizarBotonMusica() {
        const reproduciendo =
            !musica.paused && !musica.muted;

        botonMusica.textContent = reproduciendo ? "🔊" : "🔇";
        botonMusica.setAttribute("aria-pressed", String(reproduciendo));
        botonMusica.setAttribute(
            "aria-label",
            reproduciendo ? "Silenciar música" : "Activar música"
        );
    }

    // Abrir la invitación
    botonAbrir.addEventListener("click", async () => {
        if (invitacionAbierta) return;

        invitacionAbierta = true;
        botonAbrir.disabled = true;

        // Iniciar la animación de apertura
        portada.classList.add("abriendo");

        // Mostrar el control de música
        botonMusica.hidden = false;

        // Intentar reproducir música tras la interacción del usuario
        musica.volume = 0.4;

        try {
            await musica.play();
        } catch (error) {
            console.warn(
                "No se pudo reproducir la música. Revisa musica.mp3.",
                error
            );
        }

        actualizarBotonMusica();

        // Retirar la portada cuando termine la animación
        window.setTimeout(() => {
            portada.style.display = "none";
            document.body.style.overflowY = "auto";
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 1700);
    });

    // Silenciar o activar la música
    botonMusica.addEventListener("click", async () => {
        if (musica.paused) {
            musica.muted = false;

            try {
                await musica.play();
            } catch (error) {
                console.warn("No se pudo iniciar la música.", error);
            }
        } else {
            musica.muted = !musica.muted;
        }

        actualizarBotonMusica();
    });

    // Mantener el icono sincronizado con el reproductor
    musica.addEventListener("play", actualizarBotonMusica);
    musica.addEventListener("pause", actualizarBotonMusica);
    musica.addEventListener("volumechange", actualizarBotonMusica);

    // La página puede desplazarse cuando se necesite
    document.body.style.overflowY = "auto";

    actualizarBotonMusica();
});
