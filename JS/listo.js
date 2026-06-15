const fechaEvento = new Date("2026-06-14T22:40:00").getTime();

function cuentaFinal() {

    // Si Control fuerza "listo",
    // no pasar automáticamente a ranking
    if (localStorage.getItem("modoControlRally") === "listo") {
        return;
    }

    const ahora = new Date().getTime();
    const diferencia = fechaEvento - ahora;
    const contador = document.getElementById("contadorFinal");

    if (!contador) return;

    if (diferencia <= 0) {
        window.location.href = "ranking.html";
        return;
    }

    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    contador.textContent =
        `00:${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
}

cuentaFinal();
setInterval(cuentaFinal, 1000);