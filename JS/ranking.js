const CSV_RANKING = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR6GUlXru3oyt27rCOO7gw-fvL_vbpdYgDZ5Zj2cfD0wYNlGp8gEQx5uYTIOUlfa3vbMfqk43uW4_AA/pub?gid=0&single=true&output=csv";
let estadoAnterior = {};
let puntosFirmes = {};
let ultimoRanking = "";

function csvToRows(csv) {
    return csv
        .trim()
        .split(/\r?\n/)
        .map(row => row.split(","));
}

function cargarRanking() {
    const contenedor = document.getElementById("tabla-ranking");

    if (!contenedor) {
        console.log("No existe el contenedor tabla-ranking");
        return;
    }

    fetch(CSV_RANKING + "&nocache=" + Date.now(), {
        cache: "no-store"
    })
    .then(res => res.text())
    .then(csv => {

        if (!csv || csv.trim() === "") {
            console.log("CSV vacío, se conserva el ranking anterior");
            return;
        }

        const filas = csvToRows(csv).slice(1);

        const equipos = filas
            .map(fila => {
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
            })
            .filter(equipo => equipo !== null);

        if (equipos.length === 0) {
            console.log("No hay equipos válidos, se conserva el ranking anterior");
            return;
        }

        equipos.sort((a, b) => b.puntos - a.puntos);

       const rankingActual = JSON.stringify(equipos);

        if (rankingActual === ultimoRanking) {
            return;
        }

        ultimoRanking = rankingActual;

        contenedor.innerHTML = "";

        equipos.forEach((equipo, index) => {
            const posicionActual = index + 1;
            const anterior = estadoAnterior[equipo.nombre];

            let movimiento = "igual";
            let icono = "●";

            if (anterior) {
                if (posicionActual < anterior.posicion) {
                    movimiento = "sube";
                    icono = "▲";
                } else if (posicionActual > anterior.posicion) {
                    movimiento = "baja";
                    icono = "▼";
                }
            }

            let claseTop = "";
            if (index === 0) claseTop = "top1";
            if (index === 1) claseTop = "top2";
            if (index === 2) claseTop = "top3";

            const card = document.createElement("div");
            card.className = `team-card ${claseTop} mover-${movimiento}`;

            card.innerHTML = `
                <div class="position">#${posicionActual}</div>

                <div class="team-name">
                    ${equipo.nombre}
                    <span class="flecha ${movimiento}">${icono}</span>
                </div>

                <div class="points">${equipo.puntos} pts</div>
            `;

            contenedor.appendChild(card);

            estadoAnterior[equipo.nombre] = {
                posicion: posicionActual,
                puntos: equipo.puntos
            };
        });
    })
    .catch(error => {
        console.log("Error al cargar ranking, se conserva el ranking anterior:", error);
    });
}

cargarRanking();
setInterval(cargarRanking, 1000);

function actualizarFechaHora() {
    const ahora = new Date();

    const fecha = ahora.toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    const hora = ahora.toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    if (document.getElementById("fecha")) {
        document.getElementById("fecha").textContent = fecha;
    }

    if (document.getElementById("hora")) {
        document.getElementById("hora").textContent = hora;
    }

    if (document.getElementById("actualizacion")) {
        document.getElementById("actualizacion").textContent = hora;
    }

    if (document.getElementById("relojInferior")) {
        document.getElementById("relojInferior").textContent = hora;
    }
}

actualizarFechaHora();
setInterval(actualizarFechaHora, 1000);

// FINAL DEL RANKING
const fechaFinal = new Date("2026-06-15T14:30:00").getTime();

function revisarFinalEvento() {
    // Si el control manual está forzando ranking,
    // NO mandar a premiación.
    if (localStorage.getItem("modoControlRally") === "ranking") {
        return;
    }

    const ahora = new Date().getTime();

    if (ahora >= fechaFinal) {
        window.location.href = "premiacion.html";
    }
}

revisarFinalEvento();
setInterval(revisarFinalEvento, 1000);