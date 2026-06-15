const CSV_RANKING = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR6GUlXru3oyt27rCOO7gw-fvL_vbpdYgDZ5Zj2cfD0wYNlGp8gEQx5uYTIOUlfa3vbMfqk43uW4_AA/pub?gid=0&single=true&output=csv";

const fechaEvento = new Date("2026-06-14T23:48:00").getTime();
const fechaFinalRanking = new Date("2026-06-14T23:50:00").getTime();

let puntosFirmes = {};
let ultimaDataGanadores = "";

function revisarReinicioEvento() {
    if (localStorage.getItem("modoControlRally")) return;

    const ahora = new Date().getTime();

    if (ahora < fechaEvento) {
        window.location.href = "index.html";
        return;
    }

    if (ahora >= fechaEvento && ahora < fechaFinalRanking) {
        window.location.href = "ranking.html";
        return;
    }
}

function csvToRows(csv) {
    return csv.trim().split(/\r?\n/).map(row => row.split(","));
}

function cargarGanadores() {
    fetch(CSV_RANKING + "&nocache=" + Date.now(), {
        cache: "no-store"
    })
    .then(res => res.text())
    .then(csv => {
        const contenedor = document.getElementById("top5Final");
        if (!contenedor) return;

        if (!csv || csv.trim() === "") return;

        const filas = csvToRows(csv).slice(1);

        const equipos = filas.map(fila => {
            const nombre = (fila[0] || "").replace(/"/g, "").trim();
            const puntosTexto = (fila[1] || "0").replace(/"/g, "").trim();
            const puntosExcel = Number(puntosTexto);

            if (nombre === "" || isNaN(puntosExcel)) return null;

            if (puntosFirmes[nombre] === undefined) {
                puntosFirmes[nombre] = puntosExcel;
            }

            if (puntosExcel > puntosFirmes[nombre]) {
                puntosFirmes[nombre] = puntosExcel;
            }

            return {
                nombre: nombre,
                puntos: puntosFirmes[nombre]
            };
        }).filter(e => e !== null);

        equipos.sort((a, b) => b.puntos - a.puntos);

        const top5 = equipos.slice(0, 5);
        const dataActual = JSON.stringify(top5);

        if (dataActual === ultimaDataGanadores) return;

        ultimaDataGanadores = dataActual;
        contenedor.innerHTML = "";

        top5.forEach((equipo, index) => {
            const puesto = index + 1;

            const item = document.createElement("div");
            item.className = `top-item puesto-${puesto}`;

            item.innerHTML = `
                <span class="lugar">#${puesto}</span>
                <span class="nombre-equipo">${equipo.nombre}</span>
                <span class="puntos-equipo">${equipo.puntos} pts</span>
            `;

            contenedor.appendChild(item);
        });
    })
    .catch(error => {
        console.log("Error ganadores:", error);
    });
}

revisarReinicioEvento();
setInterval(revisarReinicioEvento, 3000);

cargarGanadores();
setInterval(cargarGanadores, 1000);