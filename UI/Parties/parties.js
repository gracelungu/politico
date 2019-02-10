class Parties{

    constructor(){
        
        this.createPartie = Element('create-party');

        this.init();

    }

    init(){

        this.createPartie.style.display = "none";

    }

    toggleCreation(){
        if(this.createPartie.style.display == "block"){
            this.createPartie.style.display = "none";
            Element("create-btn-icon").style.display = "block";
            Element("create-btn-text").innerHTML = "CREATE A PARTY";
            this.reset();   
        }else{
            this.createPartie.style.display = "block";
            Element("create-btn-icon").style.display = "none";
            Element("create-btn-text").innerHTML = `<img width="auto" height="12px" src="../assets/imgs/icons/up.png" alt=""/> `;
        }
    }

    reset(){
        Element("name").value = "";
        Element("adress").value = "";
        Element("save-btn").innerHTML = "SAVE";
    }

    edit(){

        let partie = {
            name:"AFDC",
            hqadress:"Ullamcorper. Street Roseville"
        };

        Element("name").value = partie.name;
        Element("adress").value = partie.hqadress;
        Element("save-btn").innerHTML = "EDIT";

        if(this.createPartie.style.display == "none"){
            this.createPartie.style.display = "block";
        }

    }

    saveParty(){

        let partie = {
            name:Element("name").value,
            hqadress:Element("adress").value
        }
    
        let valid = true;
    
        if(!RegExp(/^[a-zA-Z0-9'-/,\s]{2,30}$/).test(partie.name.toString().trim())){
            Element('name-error').innerHTML = "Invalid name";
            valid = false ;
        }else{
            Element('name-error').innerHTML = "";
        }
    
        if(!RegExp(/^[a-zA-Z0-9'-/,\s]{2,50}$/).test(partie.hqadress.toString().trim())){
            Element('adress-error').innerHTML = "Invalid adress";
            valid = false ;
        }else{
            Element('adress-error').innerHTML = "";
        }
    
        if(valid){
    
            console.log(partie);
    
        }
    
    }

}

let parties = new Parties();