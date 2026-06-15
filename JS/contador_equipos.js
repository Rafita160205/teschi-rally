const fechaEvento = new Date("2026-06-14T18:10:00").getTime();

function revisarTiempoEquipos() {
    const ahora = new Date().getTime();
    const diferencia = fechaEvento - ahora;

    if (diferencia <= 60000 && diferencia > 0) {
        window.location.href = "listo.html?v=" + Date.now();
        return;
    }

    if (diferencia <= 0) {
        window.location.href = "ranking.html?v=" + Date.now();
        return;
    }
}

revisarTiempoEquipos();
setInterval(revisarTiempoEquipos, 1000);