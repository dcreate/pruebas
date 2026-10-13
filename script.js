/* ========================================
   ELEMENTOS DE LA PÁGINA
======================================== */

const cat = document.getElementById("cat");
const greetButton = document.getElementById("greetButton");
const speechBubble = document.getElementById("speechBubble");
const mainTitle = document.getElementById("mainTitle");
const description = document.getElementById("description");

/* ========================================
   MENSAJES DE LA GATITA
======================================== */

const greetings = [
    {
        title: "¡Hola, princesa!",
        message: "¡Qué alegría verte! Te mando muchos abrazos y ronroneos. 💕",
        bubble: "¡Miau, hola! 🐱"
    },
    {
        title: "¡Eres especial!",
        message: "Nunca olvides que eres una niña maravillosa, única y muy especial. 🌸",
        bubble: "¡Eres genial! 💖"
    },
    {
        title: "¡Sonríe, bonita!",
        message: "Tu sonrisa ilumina el mundo como miles de estrellitas. ✨",
        bubble: "¡Sonríe! 🌈"
    },
    {
        title: "¡Un abrazo gatuno!",
        message: "Te envío un abrazo gigante, suavecito y lleno de amor. 🩷",
        bubble: "¡Abrazo gatuno! 🐾"
    },
    {
        title: "¡Día mágico!",
        message: "Que hoy esté lleno de juegos, dulces, aventuras y mucha felicidad. 🦄",
        bubble: "¡Qué bonito día! 🎀"
    },
    {
        title: "¡Miau, te quiero!",
        message: "Esta gatita te recuerda que siempre hay algo bonito por descubrir. 💗",
        bubble: "¡Miau, miau! 💕"
    }
];

let currentGreeting = -1;

/* ========================================
   CAMBIAR EL MENSAJE
======================================== */

function showGreeting() {

    let nextGreeting;

    if (greetings.length === 1) {
        nextGreeting = 0;
    } else {
        do {
            nextGreeting = Math.floor(
                Math.random() * greetings.length
            );
        } while (nextGreeting === currentGreeting);
    }

    currentGreeting = nextGreeting;

    const greeting = greetings[currentGreeting];

    mainTitle.textContent = greeting.title;
    description.textContent = greeting.message;
    speechBubble.textContent = greeting.bubble;

    makeCatHappy();
    createHearts(6);
}

/* ========================================
   ANIMAR A LA GATITA
======================================== */

function makeCatHappy() {

    cat.classList.remove("happy");

    // Reiniciar la animación para que se ejecute cada vez.
    void cat.offsetWidth;

    cat.classList.add("happy");

    window.setTimeout(() => {
        cat.classList.remove("happy");
    }, 600);
}

/* ========================================
   CREAR CORAZONES FLOTANTES
======================================== */

function createHearts(amount = 5) {

    const catRect = cat.getBoundingClientRect();

    const centerX = catRect.left + catRect.width / 2;
    const centerY = catRect.top + catRect.height / 2;

    const symbols = ["♥", "♡", "💕", "✨", "💗"];

    for (let i = 0; i < amount; i++) {

        const heart = document.createElement("span");

        heart.className = "floating-heart";

        heart.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        heart.style.left =
            (centerX + (Math.random() * 180 - 90)) + "px";

        heart.style.top =
            (centerY + (Math.random() * 70 - 35)) + "px";

        heart.style.animationDelay =
            (Math.random() * 0.35) + "s";

        heart.style.fontSize =
            (20 + Math.random() * 18) + "px";

        document.body.appendChild(heart);

        window.setTimeout(() => {
            heart.remove();
        }, 2000);
    }
}

/* ========================================
   INTERACCIONES
======================================== */

// Botón principal.
greetButton.addEventListener("click", showGreeting);

// Tocar a la gatita también provoca un saludo.
cat.addEventListener("click", showGreeting);

// Permitir interacción con teclado.
cat.addEventListener("keydown", (event) => {

    if (event.key === "Enter" || event.key === " ") {

        event.preventDefault();
        showGreeting();

    }

});

/* ========================================
   MENSAJE INICIAL
======================================== */

window.addEventListener("DOMContentLoaded", () => {

    // La gatita comienza saludando.
    speechBubble.textContent = "¡Hola, princesa! 💕";

});