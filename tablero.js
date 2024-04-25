const body = document.body;
const profundidadMaxima = 5; // Definir la profundidad máxima de búsqueda


const tam = 7;

const tableroV = [];
let turno = true;

const tablero = document.getElementById("tablero");
const turnoInd = document.getElementById("turnoInd");
turnoInd.innerText = "MAX";

// Copia del tablero
const tableroM = [];

for (let i = 0; i < tam; i++) {
  tableroV[i] = [];
  tableroM[i] = [];
  const colCont = document.createElement("div");
  colCont.id = i;
  colCont.className = "colCont";
  for (let j = 0; j < tam; j++) {
    tableroV[i][j] = 6 - j;
    tableroM[i][j] = ""; // Inicialmente, ninguna ficha en las casillas
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
  });

  colCont.addEventListener("mouseleave", (e) => {
    const col = colCont.id;
    const casilla = getCasilla(col);
    casilla.style = "background: none;";
  });

  colCont.addEventListener("click", (e) => {
    if (turno) {
      const col = colCont.id;
      const casilla = getCasilla(col);

      // Colocar la ficha en el tableroM
      const ficha = "R";
      const row = tableroV[col].indexOf(0);
      tableroM[col][row] = ficha;

      // Actualizar la visualización del tablero
      casilla.innerText = ficha;

      // Actualizar el tableroV
      const updatedColArr = tableroV[col].map((item) => (item -= 1));
      tableroV[col] = updatedColArr;

      // Cambiar de turno
      turno = !turno;
      turnoInd.innerText = turno ? "MAX" : "MIN";

      console.log(tableroM);
      actualizarJuego();

      // Aquí agregamos la jugada de la computadora de manera aleatoria
      if (!turno) {
        // Usar Minimax para determinar la mejor columna para la computadora
        const mejorColumna = obtenerMejorColumna(tableroM, profundidadMaxima, turno);
        
        // Realizar el movimiento en el tablero
        const colComputadora = mejorColumna.toString();
        const casillaComputadora = getCasilla(colComputadora);
        const rowComputadora = tableroV[colComputadora].indexOf(0);
        tableroM[colComputadora][rowComputadora] = "A";
        casillaComputadora.innerText = "A";
        console.log("Agregando clase casilla-max a la casilla de la computadora");
        casillaComputadora.classList.add("casilla-max"); // Agregamos la clase para cambiar el color de fondo
        casillaComputadora.style.backgroundColor = "yellow";

        const updatedColArrComputadora = tableroV[colComputadora].map((item) => (item -= 1));
        tableroV[colComputadora] = updatedColArrComputadora;
    
        // Cambiar de turno
        turno = !turno;
        turnoInd.innerText = turno ? "MAX" : "MIN";
    
        // Actualizar el juego
        actualizarJuego();
    }
    }
  });
}

function getCasilla(col) {
  const colArr = tableroV[col];
  const row = colArr.indexOf(0);
  const casilla = document.getElementById(`[${col},${row}]`);
  return casilla;
}
// Función para verificar si un jugador ha ganado
function verificarGanador(tablero, jugador) {
  // Verificar horizontalmente
  for (let i = 0; i < tam; i++) {
    for (let j = 0; j <= tam - 4; j++) {
      if (
        tablero[i][j] === jugador &&
        tablero[i][j + 1] === jugador &&
        tablero[i][j + 2] === jugador &&
        tablero[i][j + 3] === jugador
      ) {
        return true;
      }
    }
  }

  // Verificar verticalmente
  for (let i = 0; i <= tam - 4; i++) {
    for (let j = 0; j < tam; j++) {
      if (
        tablero[i][j] === jugador &&
        tablero[i + 1][j] === jugador &&
        tablero[i + 2][j] === jugador &&
        tablero[i + 3][j] === jugador
      ) {
        return true;
      }
    }
  }

  // Verificar diagonalmente (de izquierda a derecha)
  for (let i = 0; i <= tam - 4; i++) {
    for (let j = 0; j <= tam - 4; j++) {
      if (
        tablero[i][j] === jugador &&
        tablero[i + 1][j + 1] === jugador &&
        tablero[i + 2][j + 2] === jugador &&
        tablero[i + 3][j + 3] === jugador
      ) {
        return true;
      }
    }
  }

  // Verificar diagonalmente (de derecha a izquierda)
  for (let i = 0; i <= tam - 4; i++) {
    for (let j = 3; j < tam; j++) {
      if (
        tablero[i][j] === jugador &&
        tablero[i + 1][j - 1] === jugador &&
        tablero[i + 2][j - 2] === jugador &&
        tablero[i + 3][j - 3] === jugador
      ) {
        return true;
      }
    }
  }

  return false;
}

// Función para actualizar el juego si un jugador ha ganado
function actualizarJuego() {
  if (verificarGanador(tableroM, "R")) {
    alert("¡El jugador Rojo (MAX) ha ganado!");
    reiniciarJuego();
  } else if (verificarGanador(tableroM, "A")) {
    alert("¡El jugador Amarillo (MIN) ha ganado!");
    reiniciarJuego();
  }
}

// Función para reiniciar el juego
function reiniciarJuego() {
  // Reiniciar el tablero visual y el tablero de juego
  tableroM.forEach((fila) => {
    fila.fill("");
  });
  document.querySelectorAll(".casilla").forEach((casilla) => {
    casilla.innerText = "";
  });
  reiniciarTableroV();
  turno = true;
  turnoInd.innerText = "MAX";
}

// Función para reiniciar el tableroV a su estado inicial de colores
function reiniciarTableroV() {
  // Eliminar estilos de fondo de todas las casillas
  document.querySelectorAll(".casilla").forEach((casilla) => {
    casilla.style.background = "none";
  });

  // Reiniciar tableroV a su estado inicial
  for (let i = 0; i < tam; i++) {
    tableroV[i] = [];
    for (let j = 0; j < tam; j++) {
      tableroV[i][j] = 6 - j;
    }
  }
}

body.append(tablero);























/*
//FUNCION DE EVALUACIÓN 
function evaluarTablero(tablero, jugador) {
    const oponente = jugador === 'R' ? 'A' : 'R';

    // Calcular la cantidad de fichas en línea para el jugador y el oponente
    const cant3EnLineaMias = contarFichasEnLinea(tablero, jugador, 3);
    const cant2EnLineaMias = contarFichasEnLinea(tablero, jugador, 2);
    const cant1EnLineaMias = contarFichasEnLinea(tablero, jugador, 1);

    const cant3EnLineaContrario = contarFichasEnLinea(tablero, oponente, 3);
    const cant2EnLineaContrario = contarFichasEnLinea(tablero, oponente, 2);
    const cant1EnLineaContrario = contarFichasEnLinea(tablero, oponente, 1);

    // Calcular la evaluación según la fórmula proporcionada
    const evaluacion = cant3EnLineaMias + cant2EnLineaMias + cant1EnLineaMias -
                       cant3EnLineaContrario - cant2EnLineaContrario - cant1EnLineaContrario;

    return evaluacion;
}

function contarFichasEnLinea(tablero, jugador, cantidad) {
    let count = 0;

    // Verificar horizontalmente
    for (let i = 0; i < tam; i++) {
        for (let j = 0; j <= tam - cantidad; j++) {
            const fila = tablero[i].slice(j, j + cantidad);
            if (fila.every(cell => cell === jugador)) {
                count++;
            }
        }
    }

    // Verificar verticalmente
    for (let i = 0; i <= tam - cantidad; i++) {
        for (let j = 0; j < tam; j++) {
            const columna = [];
            for (let k = 0; k < cantidad; k++) {
                columna.push(tablero[i + k][j]);
            }
            if (columna.every(cell => cell === jugador)) {
                count++;
            }
        }
    }

    // Verificar diagonalmente (de izquierda a derecha)
    for (let i = 0; i <= tam - cantidad; i++) {
        for (let j = 0; j <= tam - cantidad; j++) {
            const diagonal = [];
            for (let k = 0; k < cantidad; k++) {
                diagonal.push(tablero[i + k][j + k]);
            }
            if (diagonal.every(cell => cell === jugador)) {
                count++;
            }
        }
    }

    // Verificar diagonalmente (de derecha a izquierda)
    for (let i = 0; i <= tam - cantidad; i++) {
        for (let j = cantidad - 1; j < tam; j++) {
            const diagonal = [];
            for (let k = 0; k < cantidad; k++) {
                diagonal.push(tablero[i + k][j - k]);
            }
            if (diagonal.every(cell => cell === jugador)) {
                count++;
            }
        }
    }

    return count;
}
*/
function evaluarTablero(tablero, jugador) {
    // Generar un valor aleatorio entre 0 y 1000
    return Math.floor(Math.random() * 1001);
}



/*MINMAX */
function minimax(tablero, profundidad, alfa, beta, jugadorMaximizador) {
    if (profundidad === 0 || juegoTerminado(tablero)) {
        return evaluarTablero(tablero, jugadorMaximizador);
    }

    if (jugadorMaximizador) {
        let mejorPuntaje = -Infinity;
        for (let col = 0; col < tam; col++) {
            if (esMovimientoValido(tablero, col)) {
                const nuevoTablero = realizarMovimiento(tablero, col, jugadorMaximizador);
                const puntaje = minimax(nuevoTablero, profundidad - 1, alfa, beta, !jugadorMaximizador); // Invertir el valor de jugadorMaximizador
                mejorPuntaje = Math.max(mejorPuntaje, puntaje);
                alfa = Math.max(alfa, mejorPuntaje);
                if (beta <= alfa) {
                    break; // Poda beta
                }
            }
        }
        return mejorPuntaje;
    } else {
        let mejorPuntaje = Infinity;
        for (let col = 0; col < tam; col++) {
            if (esMovimientoValido(tablero, col)) {
                const nuevoTablero = realizarMovimiento(tablero, col, jugadorMaximizador);
                const puntaje = minimax(nuevoTablero, profundidad - 1, alfa, beta, !jugadorMaximizador); // Invertir el valor de jugadorMaximizador
                mejorPuntaje = Math.min(mejorPuntaje, puntaje);
                beta = Math.min(beta, mejorPuntaje);
                if (beta <= alfa) {
                    break; // Poda alfa
                }
            }
        }
        return mejorPuntaje;
    }
    
}


/*EXTRAS */
function juegoTerminado(tablero) {
    return verificarGanador(tablero, 'R') || verificarGanador(tablero, 'A') || tableroLleno(tablero);
}

function tableroLleno(tablero) {
    for (let i = 0; i < tam; i++) {
        for (let j = 0; j < tam; j++) {
            if (tablero[i][j] === '') {
                return false;
            }
        }
    }
    return true;
}


function esMovimientoValido(tablero, col) {
    return tablero[0][col] === ''; // Verificar si la fila superior de la columna está vacía
}


function realizarMovimiento(tablero, col, jugador) {
    const nuevoTablero = tablero.map(row => [...row]); // Hacer una copia del tablero
    for (let i = tam - 1; i >= 0; i--) {
        if (nuevoTablero[i][col] === '') {
            nuevoTablero[i][col] = jugador;
            break;
        }
    }
    return nuevoTablero; // Devolver el nuevo tablero modificado
}


function obtenerMejorColumna(tablero, profundidad, jugadorMaximizador) {
    let mejorPuntaje = -Infinity;
    let mejorColumna = null;
    for (let col = 0; col < tam; col++) {
        if (esMovimientoValido(tablero, col)) {
            const nuevoTablero = realizarMovimiento(tablero, col, jugadorMaximizador);
            const puntaje = minimax(nuevoTablero, profundidad - 1, -Infinity, Infinity, !jugadorMaximizador);
            if (puntaje > mejorPuntaje) {
                mejorPuntaje = puntaje;
                mejorColumna = col;
            }
        }
    }
    return mejorColumna;
}




/*
function obtenerMejorColumna(tablero) {
    const columnasDisponibles = [];
    for (let col = 0; col < tam; col++) {
        if (esMovimientoValido(tablero, col)) {
            columnasDisponibles.push(col);
        }
    }
    // Seleccionar aleatoriamente una columna disponible
    const columnaAleatoria = columnasDisponibles[Math.floor(Math.random() * columnasDisponibles.length)];
    return columnaAleatoria;
}
*/