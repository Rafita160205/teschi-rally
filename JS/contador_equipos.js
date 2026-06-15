const fechaEvento = new Date("2026-06-15T14:20:00").getTime();

function revisarTiempoEquipos() {

    // Si Control está forzando equipos,
    // no cambiar automáticamente
    if (localStorage.getItem("modoControlRally") === "equipos") {
        return;
    }

    const ahora = new Date().getTime();
    const diferencia = fechaEvento - ahora;

    if (diferencia <= 60000 && diferencia > 0) {
        window.location.href = "listo.html";
        return;
    }

    if (diferencia <= 0) {
        window.location.href = "ranking.html";
        return;
    }
}

revisarTiempoEquipos();
setInterval(revisarTiempoEquipos, 1000);