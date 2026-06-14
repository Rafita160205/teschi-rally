const fechaEvento = new Date("2026-06-14T16:15:00").getTime();

function actualizarContador() {
    const ahora = new Date().getTime();
    const diferencia = fechaEvento - ahora;
    const contador = document.getElementById("contador");

    if (!contador) return;

    if (diferencia <= 60000 && diferencia > 0) {
        window.location.href = "listo.html?v=" + Date.now();
        return;
    }

    if (diferencia <= 0) {
        window.location.href = "ranking.html?v=" + Date.now();
        return;
    }

    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    contador.textContent = `${horas}h ${minutos}m ${segundos}s`;
}

actualizarContador();
setInterval(actualizarContador, 1000);