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
    calculaAdjacents();
}

// /*crearà una taula dinàmica del número de files per el número de columnes especificat abans.
// Cada cel·la tindrà una custom html property data-mina = "false" i contindrà una imatge fons20px.jpg. */
function crearTaulell(fi, col) {
    document.querySelector("button").innerHTML= "Iniciar Partida";
    let taulell = "<table>";
    for(let i = 0; i < fi; i++) {
        taulell+="<tr>";
        for(let j = 0; j < col; j++) {
           taulell+=`<td id="${i}-${j}" data-mina="false" data-num-mines="0" data-estat="tancada" onclick="obreCasella(${i}, ${j})">
                        <img src="./img_pescamines/fons20px.jpg" oncontextmenu="posaBandera(${i}, ${j})"  />
                    </td>`;
        }
        taulell+="</tr>";
    }
    taulell+="</table>";
    document.getElementById("taulell").innerHTML = taulell;
}

// Obre les caselles onclick
function obreCasella(x, y) {
    let casella = document.getElementById(`${x}-${y}`);
    
    if(esMina(x, y)) {
        mostraTotesLesMines();
        alert("Has perdut! 💥");
        document.querySelector("button").innerHTML= "Iniciar Nova Partida";
        return;
    } else {
        if (casella.dataset.numMines == 0) {
            obreCasellesZero(x, y);
        } else {
            casella.dataset.estat = 'oberta'; 
            casella.innerHTML = casella.dataset.numMines;
        }
    }
    // comprova si ha guanyat la partida
    if (haGuanyat()) {
        alert('Has guanyat! ');
        return;
    }
}

function obreCasellesZero(x, y) {
    let casella = document.getElementById(`${x}-${y}`);

    // caso base, que existeixa, i que no estigui 'oberta'
    if (!estaDinsTaulell(x, y) || casella.dataset.estat == 'oberta') return; 

    casella.dataset.estat = 'oberta'; 

    if (casella.dataset.numMines == "0") {
        casella.innerHTML = "";
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                obreCasellesZero(i, j);
            }
        }
    } else {
        casella.innerHTML = casella.dataset.numMines; // Mostrar el número de minas
    }
}

function posaBandera(x, y) {
    let casella = document.getElementById(`${x}-${y}`);
    casella.innerHTML = `<img src="./img_pescamines/bandera20px.jpg" onclick="treuBandera(${x}-${y})">`;
}

// function treuBandera(x, y) {
//     document.getElementById(`${x}-${y}`).innerHTML=`<img src="./img_pescamines/fons20px.jpg" onclick="obreCasella(${x}, ${i})"/>`;
// }

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
|-1, 0|    0   |1, 0|
|-1, 1| |0, 1| |1, 1|   */
function calculaAdjacents() {
    for(let i = 0; i < fi; i++) {
        for(let j = 0; j < col; j++) {
            let nMines = 0;
            if(!esMina(i, j)) {
                for(let x = i-1; x <= i+1; x++) {
                    for(let y = j-1; y <= j+1; y++) {
                        if (estaDinsTaulell(x, y)) {
                            if (esMina(x, y)) { 
                                nMines++;
                            }
                        }
                    }
                }
            }
            setMinesAdjacents(i, j, nMines);
        }
    }
}

function estaDinsTaulell(eX, eY) {
    return eX >= 0 && eX < fi && eY >= 0 && eY < col;
}

// torna un boleà de si la posició x,y hi ha una mina
function esMina(x, y) {
    let casella = document.getElementById(`${x}-${y}`);
    return casella.dataset.mina == "true";
}

// //estableix a la casella de posició x,y l’atribut del número de mines a nMinesAdjacents
function setMinesAdjacents(x, y, nMinesAdjacents) {
    let minesAdjacents = document.getElementById(`${x}-${y}`);
    minesAdjacents.dataset.numMines = nMinesAdjacents;
}

// es mostren totes les mines del taulell i un alert de que has perdut.
function mostraTotesLesMines() {
    for(let i = 0; i < fi; i++) {
        for(let j = 0; j < col; j++) {
            if (esMina(i, j)) {
                document.getElementById(`${i}-${j}`).innerHTML = '<img src="./img_pescamines/mina20px.jpg">';
            }
        }
    }
}

function haGuanyat() {
    let guanyat = true;
    for(let i = 0; i < fi; i++) {
        for(let j = 0; j < col; j++) {
            let casella = document.getElementById(`${i}-${j}`);
            if (esMina(i, j)) continue;
            if (casella.dataset.estat == "tancada") {
                guanyat = false;
            }
        }
    }
    return guanyat;
}