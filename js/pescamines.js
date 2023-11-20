// Funció principal que demana les dimensions del taulell < >
// en un rang de entre 10 - 30 files i columnes
function iniciarPartida() {
    let fi = prompt("Número de files: ");
    let col = prompt("Número de columnes: ");

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
    for(let i = 1; i <= fi; i++) {
        taulell+="<tr>";
        for(let j = 1; j <= col; j++) {
           taulell+=`<td id="${i}-${j}" data-mina="false">
                        <img src="./img_pescamines/fons20px.jpg" 
                        onclick="obreCasella(${i}, ${j})">
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
}

function setMines(fi, col) { 
    let casellasTotals = Math.floor((fi*col)*0.17); // calcula el 17% de les caselles totals.

    // for de numero de casellas total, 
    for(let i = 1; i <= casellasTotals; i++) {
        let mMin = Math.floor(Math.random()*fi);
        let mMax = Math.floor(Math.random()*col);
        // data-mina="true" en un número de casilla random
        document.getElementById(`${mMin}-${mMax}`).dataset.mina = "true"; // cambia data-mina de false a true
    }
}

// function calculaAdjacents() { }

// torna un boleà de si la posició x,y hi ha una mina
// function esMina(x, y) {}

// //estableix a la casella de posició x,y l’atribut del número de mines a nMinesAdjacents
// function setMinesAdjacents(x, y, nMinesAdjacents) {}