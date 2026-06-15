const CSV_CONTROL = "https://docs.google.com/spreadsheets/d/1f77TuaTJJ1MX5malojxt8bfJ5l5unbzXXGNAvyQExoM/gviz/tq?tqx=out:csv&gid=481839722";

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

function limpiar(valor) {
    return String(valor || "")
        .replace(/"/g, "")
        .trim()
        .toLowerCase();
}

function normalizarRuta(ruta) {
    if (ruta === "" || ruta === "/") return "/";
    if (ruta === "/ranking") return "/ranking.html";
    if (ruta === "/ganadores") return "/ganadores.html";
    if (ruta === "/premiacion") return "/premiacion.html";
    if (ruta === "/equipos") return "/equipos.html";
    if (ruta === "/listo") return "/listo.html";
    if (ruta === "/pendiente") return "/pendiente.html";
    return ruta;
}

function revisarControlGlobal() {
    fetch(CSV_CONTROL + "&nocache=" + Date.now(), { cache: "no-store" })
        .then(res => res.text())
        .then(csv => {
            const lineas = csv.trim().split(/\r?\n/);
            if (lineas.length < 2) return;

            const columnas = lineas[1].split(",");
            const modo = limpiar(columnas[0]);

            if (modo === "" || modo === "auto" || modo === "normal" || modo === "ninguno") {
                localStorage.removeItem("modoControlRally");
                return;
            }

            const destino = rutasControl[modo];
            if (!destino) return;

            localStorage.setItem("modoControlRally", modo);

            const actual = normalizarRuta(location.pathname);

            if (actual !== destino) {
                window.location.replace(destino);
            }
        })
        .catch(error => console.log("Error control global:", error));
}

revisarControlGlobal();
setInterval(revisarControlGlobal, 2000);