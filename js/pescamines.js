let fi = 0;
let col = 0;

// Funció principal que demana les dimensions del taulell < >
// en un rang de entre 10 - 30 files i columnes
function iniciarPartida() {
    fi = prompt("Número de files: ");
    col = prompt("Número de columnes: ");

    /* mínim 10 màxim 30 files i columnes */
    if (fi <= 10) fi = 10;
    if (fi >= 30) fi = 30;
    if (col <= 10) col = 10;
    if (col >= 30) col = 30;

    crearTaulell(fi, col);
    setMines();
}

// /*crearà una taula dinàmica del número de files per el número de columnes especificat abans.
// Cada cel·la tindrà una custom html property data-mina = "false" i contindrà una imatge fons20px.jpg. */
function crearTaulell(fi, col) {
    let taulell = "<table>";
    for(let i = 0; i < fi; i++) {
        taulell+="<tr>";
        for(let j = 0; j < col; j++) {
           taulell+=`<td id="${i}-${j}" data-mina="false" data-num-mines=0 onclick="obreCasella(${i}, ${j})">
                        <img src="./img_pescamines/fons20px.jpg" />
                    </td>`;
        }
        taulell+="</tr>";
    }
    taulell+="</table>";
    document.getElementById("taulell").innerHTML = taulell;
}

// Al crear el onclick del img en format text, passar-li els paràmetres i, j.
function obreCasella(x, y) {
    console.log(`${x}-${y}`);
    document.getElementById(`${x}-${y}`).innerHTML = ""; // buscar la manera de quitar la img
    if(esMina(x, y)) {
        console.log("Pisaste una mina ", x, "-", y);
        document.getElementById(`${x}-${y}`).innerHTML = '<img src=./img_"pescamines/mina20px.jpg">';
    }
}

function setMines() { 
    let minesTotals = Math.floor((fi*col)*0.17); // calcula el 17% de les caselles totals.
    for (let i = 0; i < minesTotals; i++) {
        let mX = Math.floor(Math.random()*fi);
        let mY = Math.floor(Math.random()*col);
        // obté una casella random i canvia el valor de dataset a true
        let casella = document.getElementById(`${mX}-${mY}`);
        casella.dataset.mina = "true"; // cambia data-mina a true
    }
}

/* També has de crear un mètode calculaAdjacents() que recorrerà el taulell i apuntarà el número de
mines adjacents de cada casella en una custom html property data-num-mines inicialment a cero.
|-1,-1| |0,-1| |1,-1|
|-1, 0|    1   |1, 0|
|-1, 1| |0, 1| |1, 1|
*/

function calculaAdjacents() {
    let nMines = 0;
    /*recorre el tablero*/
    for(let i = 0; i < fi; i++) {
        for(let j = 0; j < col; j++) {

            if(!(esMina(i, j))) {
                // recorrera las posiciones que tiene alrededor entre -1, 0, 1
                for(let x = -1; x <= 1; x++) {
                    for(let y = -1; y <= 1; y++) {
                        let eX = i + x; // posició de la fila + eix X 
                        let eY = j + y; // posició de la columna + eix Y 

                        // Comprovar si la casella està dins del taulell
                        if (eX >= 0 && eX < fi && eY >= 0 && eY < col) {
                            // si hi ha mina, incrementa el valor de nMines
                            if (esMina(eX, eY)) {
                                nMines++;
                            }
                        }
                    }
                }
            }
            let casella = document.getElementById(`${i}-${j}`);
        }
    }
}

// torna un boleà de si la posició x,y hi ha una mina
function esMina(x, y) {
    let casella = document.getElementById(`${x}-${y}`);
    return casella.dataset.mina == "true";
}

// //estableix a la casella de posició x,y l’atribut del número de mines a nMinesAdjacents
function setMinesAdjacents(x, y, nMinesAdjacents) {
    let minesAdjacents = document.getElementById(`${x}-${y}`);
    minesAdjacents.dataset.num_mines = nMinesAdjacents;
}