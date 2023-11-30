
let files = 0;
let columnes = 0;
let numMines = 0;
let acabat = false;

function iniciarPartida(){
    acabat = false;
    files = parseInt(prompt('Introdueix el nombre de files, entre 10 i 30'));
    columnes= parseInt(prompt('Introdueix el nombre de columnes, entre 10 i 30'));

    if (files < 10){
        files = 10;
    }

    if (files > 30){
        files = 30;
    }
    if (columnes < 10){
        columnes = 10;
    }

    if (columnes > 30){
        columnes = 30;
    }

    crearTaulell(files,columnes);
    setMines(files,columnes);
    calculaAdjacents(files,columnes);
}


// Funció que crea el taulell de joc
function crearTaulell(files, columnes){
    
    let div = document.getElementById("taulell");
     let taulell = "<table>";
    for (let i = 0; i < files; i++){
        taulell += "<tr>";
        for (let j=0; j < columnes; j++){
            taulell += `<td id='${i}-${j}' data-mina="false" data-num-mines="0" data-mostrada="false" onclick = "obreCasella(${i},${j})" oncontextmenu="posaBandera(${i},${j})">`;
            taulell += `<img src="./img/fons20px.jpg">`;
            taulell += "</td>";
        }
        taulell+="</tr>";
 
    }
    taulell +="</table>";
    div.innerHTML = taulell;
    
    

}
// Funció que obre la casella i mira si és una mina o no, si és una mina et surt una alerta de que has perdut, si no ho és continua el joc
function obreCasella(x,y){
    console.log("ha obert la casella");
   
    if (esMina(x,y)){
        alert("Has perdut");
        acabat = true;
        mostraMines(files,columnes);
        return;
        
    }else {
        mostraCaselles(x,y);
        if (comprovaGuanyat(files, columnes)) {
            acabat = true;
            alert("has guanyat!");
            return;
        }
        
    }
    
    

}
//Funció que et col·loca les mines en el taulell de manera random tenint en compte que ha de tindre un 17% de mines
function setMines(files,columnes){ 
    let percentatge = (files * columnes)*0.17; //percentatge de mines 
    numMines = percentatge;
    let imatge = "";
    let x = 0;
    let y = 0;

    while (percentatge > 0){
        for (let i= 0; i < percentatge; i++){
            x = Math.floor(Math.random()*files);
            y = Math.floor(Math.random()*columnes);
            imatge = document.getElementById(`${x}-${y}`);
            if (imatge.dataset.mina!= true){
                imatge.dataset.mina = true; //passa a ser de data-mina a mina
                percentatge--;
            }
            
        }
    }
    
}
// Funció que mostra totes les mines una vegada has perdut
 function mostraMines(files,columnes){
    let imatge = "";
    for(let i=0; i < files; i++){
        for(let j=0; j < columnes; j++){
            imatge = document.getElementById(`${i}-${j}`);
            if(esMina(i,j)){
                imatge.innerHTML= "<img src='./img/mina20px.jpg'>";
            }
        }
    }
 }

// Funció que retorna si a la posició x, y hi ha una mina
function esMina(x,y){ 
    let casella = document.getElementById(`${x}-${y}`);

    if (casella.dataset.mina == "true"){
        return true;
        
    }
}
// Funció que recorre el taulell i apunta el número de mines adjacents de cada casella en una custom html property data-num-mines inicialment a 0
function calculaAdjacents(files, columnes) {
    let casella = "";
    let casellaAfectada = "";

    for (let i = 0; i < files; i++) {
        for (let j = 0; j < columnes; j++) {
            casella = document.getElementById(`${i}-${j}`);
            if (!esMina(i, j)) {
                for (let x = i - 1; x <= i + 1; x++) {
                    for (let y = j - 1; y <= j + 1; y++) {
                        casellaAfectada = document.getElementById(`${x}-${y}`);

                        if (casellaAfectada != null && esMina(x, y)) {
                            casella.dataset.numMines = parseInt(casella.dataset.numMines) + 1;
                            console.log(casellaAfectada.dataset.numMines);
                        }
                    }
                }
            }
        }
    }
}

/*Funció que quan cliques una casella que no és una bomba, et mira quin es el seu numMines,
 si es 0 mostra les del voltant, si al voltant hi ha 0 aplica recursivitat, si es major a 0 només mostra aquella casella*/
function mostraCaselles(x, y) {
    let casella = document.getElementById(`${x}-${y}`);

    if (casella && casella.dataset.mostrada != "true"&& acabat == false) { // si no es null i casella no s'ha mostrat entra, això també evita que es surti del for quan fa recursivitat
        let numBombes = parseInt(casella.dataset.numMines);

        casella.innerHTML = `<span>${numBombes}</span>`; //obrim la casella amb el valor de numMines
        casella.dataset.mostrada = "true"; //al obrir-se passa a estar mostrada
        
        if (numBombes == 0) {  //si és zero comrpovem les del voltant
            for (let i = x - 1; i <= x + 1; i++) {
                for (let j = y - 1; j <= y + 1; j++) {
                    if (i != x || j != y) { //per evitar la recursivitat infinita mirem que no repetim la casella
                        mostraCaselles(i, j);
                    }
                }
            }
        }
    }
}

//TODO EXTRA
function posaBandera(i,j){
    let casella = document.getElementById(`${i}-${j}`);

    if (!casella.dataset.mostrada){
        casella.innerHTML=`<img src="./img/bandera20px.jpg">`;
    }
}

//Funció que comprova si has guanyat 
function comprovaGuanyat(files,columnes){
    for (let i = 0; i < files; i++){
        for (let j = 0; j < columnes; j++){
            let casella = document.getElementById(`${i}-${j}`);
            if (casella.dataset.mina == "true") continue;
            if (casella.dataset.mostrada == "false") return false;
        }
        
    }
    return true;
}



