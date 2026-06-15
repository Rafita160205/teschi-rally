const CSV_CONTROL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR6GUlXru3oyt27rCOO7gw-fvL_vbpdYgDZ5Zj2cfD0wYNlGp8gEQx5uYTIOUlfa3vbMfqk43uW4_AA/pub?gid=481839722&single=true&output=csv";

const rutasControl = {
    inicio: "/",
    index: "/",
    pendiente: "/pendiente.html",
    equipos: "/equipos.html",
    listo: "/listo.html",
    ranking: "/ranking.html",
    premiacion: "/premiacion.html",
    ganadores: "/ganadores.html"
};

function csvToRowsControl(csv) {
    return csv.trim().split(/\r?\n/).map(row => row.split(","));
}

function revisarControlGlobal() {
    fetch(CSV_CONTROL + "&nocache=" + Date.now(), { cache: "no-store" })
        .then(res => res.text())
        .then(csv => {
            const filas = csvToRowsControl(csv);
            const modo = (filas[1]?.[0] || "").trim().toLowerCase();

            if (modo === "auto" || modo === "normal" || modo === "ninguno" || modo === "") {
                return;
            }

            const destino = rutasControl[modo];
            if (!destino) return;

            const actual = location.pathname;

            if (actual !== destino) {
                window.location.href = destino + "?v=" + Date.now();
            }
        })
        .catch(error => console.log("Error en control global:", error));
}

revisarControlGlobal();
setInterval(revisarControlGlobal, 3000);