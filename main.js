let persoana = {
    nume : "seby",
    varsta : 25,
    job : "inginer",
    marcaMasina : "Skoda",
    listAll : function(){
        console.log("Nume: "+this.nume);
        console.log("Varsta: "+this.varsta);
        console.log("Job: "+this.job);
        console.log("Marca Masina: "+this.marcaMasina);
    }
}

function getName(nume){
    console.log( "Buna, numele meu este "+nume);
}

console.log(persoana);
persoana.listAll();
getName("Seby");