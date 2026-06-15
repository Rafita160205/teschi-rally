const fechaEvento = new Date("2026-06-14T23:48:00").getTime();

function actualizarContadorPendiente() {

    // Si Control fuerza pendiente, no cambiar automáticamente
    if (localStorage.getItem("modoControlRally") === "pendiente") {
        return;
    }

    const ahora = new Date().getTime();
    const diferencia = fechaEvento - ahora;
    const contador = document.getElementById("contadorPendiente");

    if (!contador) return;

    if (diferencia <= 60000 && diferencia > 0) {
        window.location.href = "listo.html";
        return;
    }

    if (diferencia <= 0) {
        window.location.href = "ranking.html";
        return;
    }

    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    contador.textContent = `${horas}h ${minutos}m ${segundos}s`;
}

actualizarContadorPendiente();
setInterval(actualizarContadorPendiente, 1000);