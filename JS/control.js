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

    fetch(CSV_CONTROL, {
        cache: "no-store"
    })
    .then(res => res.text())
    .then(csv => {

        const filas = csvToRowsControl(csv);

        const modo = (filas[1]?.[0] || "").trim().toLowerCase();

        if (!modo) return;

        const destino = rutasControl[modo];

        if (!destino) return;

        let actual = location.pathname;

        if (actual === "/ganadores") actual = "/ganadores.html";
        if (actual === "/ranking") actual = "/ranking.html";
        if (actual === "/premiacion") actual = "/premiacion.html";
        if (actual === "/equipos") actual = "/equipos.html";
        if (actual === "/listo") actual = "/listo.html";
        if (actual === "/pendiente") actual = "/pendiente.html";

        if (actual !== destino) {
            window.location.href = destino;
        }

    })
    .catch(error => {
        console.log("Error control global:", error);
    });
}

revisarControlGlobal();
setInterval(revisarControlGlobal, 3000);