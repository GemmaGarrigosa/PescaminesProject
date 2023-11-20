function iniciarPartida(){
    let numero = parseInt(prompt('Introdueix el nombre de files i columnes, entre 10 i 30'));

    if (numero < 10){
        numero = 10;
    }

    if (numero > 30){
        numero = 30;
    }

    crearTaulell(numero);
}


// Funció que crea el taulell de joc
function crearTaulell(numero){

    let taulell = document.getElementById("taulell");

    let t = document.createElement("table"); //creem la taula 

    for (let i= 0; i < numero; i++){
        let tr = document.createElement("tr");
        t.appendChild(tr);
        for (let j = 0; j < numero; j++){
            let td = document.createElement("td");
            tr.appendChild(td);
            let imatge = document.createElement("img"); //Creem la imatge
            imatge.src="./img/fons20px.jpg";
            imatge.setAttribute("onclick",`obreCasella(${i},${j})`);
            imatge.setAttribute("data-mina","false");
            
            td.appendChild(imatge);
              
        }
    }
    
    taulell.appendChild(t);
}

function obreCasella(x,y){
    console.log(`Aquestes son les coordenades... x = ${x} y = ${y}`); //               !!!!!!FALTA FER LA LÒGICA DE LA FUNCIÓ !!!!!
}

function setMines(numero){ 
   
}