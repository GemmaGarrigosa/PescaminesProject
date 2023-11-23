
let files = 0;
let columnes = 0;

function iniciarPartida(){
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
            taulell += `<td>`;
            taulell += `<img id='${i}-${j}' src="./img/fons20px.jpg" data-mina="false" data-num-mines="0" onclick = "obreCasella(${i},${j})">`;
            taulell += "</td>";
        }
        taulell+="</tr>";
 
    }
    taulell +="</table>";
    div.innerHTML = taulell;
    
    

}

function obreCasella(x,y){
    console.log("ha obert la casella");
    
    if (esMina(x,y)){
        alert("Has perdut");
        mostraMines(files,columnes);
        
    }else {
        console.log('no es mina');
        
    }
}

function setMines(files,columnes){ 
    let percentatge = (files * columnes)*0.17; //percentatge de mines 
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
                imatge.src= "./img/mina20px.jpg";
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
function calculaAdjacents(files,columnes){
    let casella = "";
    let casellaAfectada = "";
    numeroMines = 0;
    for (let i = 0; i < files; i++){
        for(let j=0; j < columnes; j++){
            casella = document.getElementById(`${i}-${j}`);
            if (esMina(i,j)){
                for (let x = i-1; x < i+1; x++){
                    for (let y = j-1; y < j+1; y++){
                        casellaAfectada = document.getElementById(`${x}-${y}`);
                        
                        if (casellaAfectada != null){
                        casellaAfectada.dataset.numMines++;
                        console.log(casellaAfectada.dataset.numMines); // AL REVÉS GEMMITA, QUE MIRI SI NO HI HA MINA I DESPRÈS SUMAR
                        numeroMines = 0;
                        }
                    }
                }
            }
            
        }
    }
}
