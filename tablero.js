const body = document.body;

const tam = 7;

const tableroV = [];
let turno = true;

const tablero = document.getElementById("tablero");

const turnoInd = document.getElementById("turnoInd");
turnoInd.innerText = "MAX";

for (let i = 0; i < tam; i++) {
  tableroV[i] = [];
  const colCont = document.createElement("div");
  colCont.id = i;
  colCont.className = "colCont";
  for (let j = 0; j < tam; j++) {
    tableroV[i][j] = 6 - j;
    const casilla = document.createElement("div");
    casilla.id = `[${i},${j}]`;
    casilla.className = "casilla";
    colCont.appendChild(casilla);
    tablero.append(colCont);
  }

  colCont.addEventListener("mouseenter", (e) => {
    const col = colCont.id;
    const casilla = getCasilla(col);
    casilla.style = `background: ${turno ? "red" : "yellow"};`;
  })

  colCont.addEventListener("mouseleave", (e) => {
    const col = colCont.id;
    const casilla = getCasilla(col);
    casilla.style = "background: none;";
  })

  colCont.addEventListener("click", (e) => {
    const col = colCont.id;
    const updatedColArr = tableroV[col].map((item) => (item -= 1));
    tableroV[col] = updatedColArr;
    turno = !turno;
    turnoInd.innerText = turno ? "MAX" : "MIN"
    console.log(tableroV)
  });
}

function getCasilla(col) {
  const colArr = tableroV[col];
  const row = colArr.indexOf(0);
  const casilla = document.getElementById(`[${col},${row}]`);
  return casilla;
}

body.append(tablero);
