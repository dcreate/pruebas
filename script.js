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
    
    
botonAbrir.addEventListener("click", () => {
    if (invitacionAbierta) return;

    invitacionAbierta = true;
    botonAbrir.disabled = true;

    // Abrir las cortinas
    portada.classList.add("abriendo");
    botonMusica.hidden = false;

    // Iniciar la música sin bloquear la animación
    musica.volume = 0.4;
    musica.play().catch(error => {
        console.warn("No se pudo reproducir la música:", error);
    });

    // Quitar por completo la portada al terminar
    setTimeout(() => {
        portada.remove();
        document.body.style.overflow = "auto";

        // Asegurar que la invitación quede visible
        const invitacion = document.getElementById("invitacion");
        invitacion.style.display = "block";
        invitacion.style.visibility = "visible";
        invitacion.style.opacity = "1";
    }, 1800);
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