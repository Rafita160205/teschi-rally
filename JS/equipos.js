const CSV_EQUIPOS = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR6GUlXru3oyt27rCOO7gw-fvL_vbpdYgDZ5Zj2cfD0wYNlGp8gEQx5uYTIOUlfa3vbMfqk43uW4_AA/pub?gid=0&single=true&output=csv";
function csvToRows(csv) {
    return csv.trim().split(/\r?\n/).map(row => row.split(","));
}

function cargarEquipos() {

    fetch(CSV_EQUIPOS + "&nocache=" + Date.now())
        .then(res => res.text())
        .then(csv => {

            const filas = csvToRows(csv).slice(1);

            const equipos = [];
            const usados = [];

            filas.forEach(fila => {
                const nombre = (fila[1] || "").trim();

                if (nombre === "") return;

                const clave = nombre.toLowerCase();

                if (!usados.includes(clave)) {
                    usados.push(clave);
                    equipos.push(nombre);
                }
            });

            const total = document.getElementById("totalEquipos");
            const lista = document.getElementById("listaEquipos");

            total.textContent = equipos.length;

            if (lista.dataset.totalAnterior == equipos.length) {
                return;
            }

            lista.dataset.totalAnterior = equipos.length;
            lista.innerHTML = "";

            if (!document.getElementById("estiloEquiposPro")) {
                const style = document.createElement("style");
                style.id = "estiloEquiposPro";

                style.innerHTML = `
                    #listaEquipos{
                        width: 95%;
                        max-height: 520px;
                        overflow-y: auto;
                        margin: 25px auto;
                        display: flex;
                        flex-direction: column;
                        gap: 12px;
                    }

                    .equipo-rank-card{
                        display: grid;
                        grid-template-columns: 90px 1fr;
                        align-items: center;
                        min-height: 68px;
                        padding: 12px 20px;
                        border-radius: 16px;
                        background: linear-gradient(90deg, rgba(0,35,22,.95), rgba(0,110,60,.80));
                        border: 2px solid rgba(0,255,136,.60);
                        box-shadow: 0 0 18px rgba(0,255,136,.35), inset 0 0 22px rgba(0,255,136,.10);
                        position: relative;
                        overflow: hidden;
                        color: white;
                        font-weight: 900;
                    }

                    .equipo-rank-card::before{
                        content: "";
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 12px;
                        height: 100%;
                        background: #00ff88;
                        box-shadow: 0 0 18px #00ff88;
                    }

                    .equipo-num{
                        color: #00ff88;
                        font-size: 2rem;
                        text-shadow: 0 0 14px #00ff88;
                        z-index: 2;
                    }

                    .equipo-nombre{
                        font-size: 1.15rem;
                        text-align: left;
                        z-index: 2;
                    }

                    .total-box-pro{
                        display: inline-block;
                        margin: 10px auto 25px;
                        padding: 14px 35px;
                        border-radius: 25px;
                        border: 2px solid #00ff88;
                        background: rgba(0,255,136,.10);
                        color: #00ff88;
                        font-size: 3rem;
                        box-shadow: 0 0 25px rgba(0,255,136,.7);
                        text-shadow: 0 0 15px #00ff88;
                    }

                    .img-vs{
                        max-width: 210px !important;
                        width: 100% !important;
                        height: auto !important;
                    }

                    @media(max-width:900px){
                        .equipo-rank-card{
                            grid-template-columns: 65px 1fr;
                        }

                        .equipo-num{
                            font-size: 1.6rem;
                        }

                        .equipo-nombre{
                            font-size: 1rem;
                        }
                    }
                `;

                document.head.appendChild(style);
            }

            total.classList.add("total-box-pro");

            equipos.forEach((nombre, index) => {

                const item = document.createElement("div");
                item.className = "equipo-rank-card";

                item.innerHTML = `
                    <span class="equipo-num">#${index + 1}</span>
                    <span class="equipo-nombre">${nombre}</span>
                `;

                lista.appendChild(item);
            });
        })
        .catch(error => {
            console.log("Error al cargar equipos:", error);
            document.getElementById("totalEquipos").textContent = "Error";
        });
}

cargarEquipos();
setInterval(cargarEquipos, 30000);