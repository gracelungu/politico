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
        }else{
            this.createPartie.style.display = "block";
        }
    }

    saveSettings(){

        let user = {
            name:Element("name").value,
            hqadress:Element("adress").value
        }
    
        let valid = true;
    
        if(!RegExp(/^[a-zA-Z'-]{2,30}$/).test(user.firstname.toString().trim())){
            Element('first-name-error').innerHTML = "Invalid first name";
            valid = false ;
        }else{
            Element('first-name-error').innerHTML = "";
        }
    
        if(!RegExp(/^[a-zA-Z'-]{2,30}$/).test(user.lastname.toString().trim())){
            Element('last-name-error').innerHTML = "Invalid last name";
            valid = false ;
        }else{
            Element('last-name-error').innerHTML = "";
        }
    
        if(valid){
    
            this.toast.show("Settings saved", false);
    
            console.log(user);
    
        }
    
    }

}

let parties = new Parties();