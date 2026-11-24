
/* SELECCIÓN DE LIBROS */

const botones = document.querySelectorAll("[data-libro]");

botones.forEach((boton) => {

    boton.addEventListener("click", () => {

        // Identificar el libro seleccionado
        const libro = boton.dataset.libro;

        // Guardar el libro seleccionado
        sessionStorage.setItem("libroSeleccionado", libro);

        // Abrir el tutorial
        window.location.href = "../2%20Tutorial/index.html";

    });

});
