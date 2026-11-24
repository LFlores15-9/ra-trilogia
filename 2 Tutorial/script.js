
/* =========================================
   TUTORIAL INTERACTIVO
   TODAVÍA ME CUIDA
========================================= */

/* SECUENCIA DE VOCALES */

const letras = ["A", "E", "I", "O", "U"];

/* VARIABLES DE CONTROL */

let indice = 0;
let reproduciendo = false;
let tutorialFinalizado = false;

/* ELEMENTOS HTML */

const contenedor = document.getElementById(
    "contenedorVocales"
);

const audio = document.getElementById(
    "audioLetra"
);

const progreso = document.getElementById(
    "progreso"
);

const estado = document.getElementById(
    "estado"
);

/* =========================================
   RUTAS DE LOS TRES LIBROS
========================================= */

const rutasLibros = {

    "noche":
        "../3%20Libro%20Noche/index.html",

    "hora-azul":
        "../4%20Libro%20Hora%20Azul/index.html",

    "alba":
        "../5%20Libro%20Alba/index.html"

};

/* =========================================
   CREAR CINCO POSICIONES FIJAS
========================================= */

function crearVocales() {

    letras.forEach((letra, posicion) => {

        /* CONTENEDOR DE LA VOCAL */

        const vocalItem = document.createElement("div");
        vocalItem.className = "vocal-item";

        /* BOTÓN DE LA VOCAL */

        const boton = document.createElement("button");

        boton.className = "letra-boton";
        boton.type = "button";
        boton.disabled = true;

        boton.setAttribute(
            "aria-label",
            `Escuchar letra ${letra}`
        );

        /* IMAGEN DE LA VOCAL */

        const imagen = document.createElement("img");

        imagen.src =
            `recursos/imagenes/${letra}.png`;

        imagen.alt = `Letra ${letra}`;
        imagen.draggable = false;

        boton.appendChild(imagen);

        /* MANO INDICADORA */

        const mano = document.createElement("img");

        mano.src = "recursos/imagenes/mano.png";
        mano.alt = "";
        mano.className = "mano";
        mano.draggable = false;

        /* AGREGAR ELEMENTOS */

        vocalItem.appendChild(boton);
        vocalItem.appendChild(mano);

        contenedor.appendChild(vocalItem);

        /* EVENTO DE PULSACIÓN */

        boton.addEventListener("click", () => {

            if (posicion === indice) {
                reproducirVocal(letra, boton);
            }

        });

    });

    activarVocal(0);
}

/* =========================================
   ACTIVAR VOCAL
========================================= */

function activarVocal(posicion) {

    const vocales = contenedor.querySelectorAll(
        ".vocal-item"
    );

    vocales.forEach((item, i) => {

        const boton = item.querySelector(
            ".letra-boton"
        );

        const mano = item.querySelector(
            ".mano"
        );

        if (i < posicion) {

            /* VOCAL COMPLETADA */

            item.classList.add(
                "visible",
                "completada"
            );

            item.classList.remove("activa");

            boton.disabled = true;
            mano.style.display = "none";

        } else if (i === posicion) {

            /* VOCAL ACTUAL */

            item.classList.add(
                "visible",
                "activa"
            );

            item.classList.remove("completada");

            boton.disabled = false;
            mano.style.display = "block";

        } else {

            /* VOCAL PENDIENTE */

            item.classList.remove(
                "visible",
                "activa",
                "completada"
            );

            boton.disabled = true;
            mano.style.display = "none";

        }

    });

    progreso.textContent =
        `Letra ${posicion + 1} de ${letras.length}`;

    estado.textContent = "";
}

/* =========================================
   REPRODUCIR SONIDO
========================================= */

async function reproducirVocal(letra, boton) {

    if (reproduciendo || tutorialFinalizado) {
        return;
    }

    reproduciendo = true;
    boton.disabled = true;

    audio.src =
        `recursos/sonidos/${letra}.mp3`;

    try {

        await audio.play();

    } catch (error) {

        console.error(
            "Error al reproducir el audio:",
            error
        );

        estado.textContent =
            "No se pudo reproducir. Intenta nuevamente.";

        boton.disabled = false;
        reproduciendo = false;

    }
}

/* =========================================
   TERMINAR CADA SONIDO
========================================= */

audio.addEventListener("ended", () => {

    if (!reproduciendo || tutorialFinalizado) {
        return;
    }

    indice++;
    reproduciendo = false;

    if (indice < letras.length) {

        activarVocal(indice);

    } else {

        finalizarTutorial();

    }

});

/* =========================================
   FINALIZAR TUTORIAL
========================================= */

function finalizarTutorial() {

    tutorialFinalizado = true;

    const vocales = contenedor.querySelectorAll(
        ".vocal-item"
    );

    vocales.forEach((item) => {

        item.classList.add(
            "visible",
            "completada"
        );

        item.classList.remove("activa");

        const boton = item.querySelector(
            ".letra-boton"
        );

        boton.disabled = true;

        const mano = item.querySelector(
            ".mano"
        );

        mano.style.display = "none";

    });

    progreso.textContent = "¡Muy bien!";

    estado.textContent =
        "¡Ya puedes explorar tu libro!";

    /* RECUPERAR LIBRO SELECCIONADO */

    const libro = sessionStorage.getItem(
        "libroSeleccionado"
    );

    const destino = rutasLibros[libro];

    /* TRANSICIÓN FINAL */

    setTimeout(() => {

        if (destino) {

            window.location.href = destino;

        } else {

            window.location.href =
                "../1%20Selecci%C3%B3n%20libros/index.html";

        }

    }, 1800);
}

/* =========================================
   INICIAR TUTORIAL
========================================= */

crearVocales();
