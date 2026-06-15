const CSV_CONTROL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR6GUlXru3oyt27rCOO7gw-fvL_vbpdYgDZ5Zj2cfD0wYNlGp8gEQx5uYTIOUlfa3vbMfqk43uW4_AA/pub?gid=481839722&single=true&output=csv";

const rutasControl = {
    inicio: "index.html",
    pendiente: "pendiente.html",
    equipos: "equipos.html",
    listo: "listo.html",
    ranking: "ranking.html",
    premiacion: "premiacion.html",
    ganadores: "ganadores.html"
};

function csvToRowsControl(csv) {
    return csv
        .trim()
        .split(/\r?\n/)
        .map(row => row.split(","));
}

function revisarControlGlobal() {
    fetch(CSV_CONTROL + "&nocache=" + Date.now(), {
        cache: "no-store"
    })
    .then(res => res.text())
    .then(csv => {
        const filas = csvToRowsControl(csv);
        const modo = (filas[1]?.[0] || "").trim().toLowerCase();

        // MODO AUTO: no fuerza ninguna página, deja que el rally siga normal
        if (modo === "auto" || modo === "normal" || modo === "ninguno" || modo === "") {
            return;
        }

        // Si el modo no existe, no hace nada
        if (!rutasControl[modo]) return;

        const paginaActual = location.pathname.split("/").pop() || "index.html";
        const destino = rutasControl[modo];

        // Solo redirige si estás en una página diferente
        if (paginaActual !== destino) {
            window.location.href = destino + "?v=" + Date.now();
        }
    })
    .catch(error => {
        console.log("Error en control global:", error);
    });
}

revisarControlGlobal();
setInterval(revisarControlGlobal, 3000);