const fechaEvento = new Date("2026-06-14T16:15:00").getTime();

function cuentaFinal() {
    const ahora = new Date().getTime();
    const diferencia = fechaEvento - ahora;
    const contador = document.getElementById("contadorFinal");

    if (!contador) return;

    if (diferencia <= 0) {
        window.location.href = "ranking.html?v=" + Date.now();
        return;
    }

    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    contador.textContent =
        `00:${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
}

cuentaFinal();
setInterval(cuentaFinal, 1000);