class User {

    constructor(firstname, lastname, othername, telephone = '', email, password){
        this.firstname = firstname;
        this.lastname = lastname;
        this.othername = othername;
        this.phoneNumber = telephone;
        this.passportUrl = '';
        this.email = email;
        this.password = password;
    }

    validate(confrimPassword){

        let valid = true;

        if(!RegExp(/^[a-zA-Z'-]{2,30}$/).test(this.firstname.toString().trim())){
            Element('first-name-error').innerHTML = "Invalid first name";
            valid = false ;
        }else{
            Element('first-name-error').innerHTML = "";
        }

        if(!RegExp(/^[a-zA-Z'-]{2,30}$/).test(this.lastname.toString().trim())){
            Element('last-name-error').innerHTML = "Invalid last name";
            valid = false ;
        }else{
            Element('last-name-error').innerHTML = "";
        }

        if(!RegExp(/^[a-zA-Z'-]{2,30}$/).test(this.othername.toString().trim())){
            Element('other-name-error').innerHTML = "Invalid other name";
            valid = false ;
        }else{
            Element('other-name-error').innerHTML = "";
        }

        if(!RegExp(/^[0-9/+]{4,20}$/).test(this.phoneNumber.toString().trim())){
            Element('telephone-error').innerHTML = "Invalid telephone number";
            valid = false ;
        }else{
            Element('telephone-error').innerHTML = "";
        }

        if(!RegExp(/^[a-zA-Z-._]+@[a-zA-Z-._]+.[a-zA-Z]{2,4}$/).test(this.email.toString().toLowerCase().trim())){
            Element('email-error').innerHTML = "Invalid email ";
            valid = false ;
        }else{
            Element('email-error').innerHTML = "";
        }

        if(this.password.toString().length < 6){
            Element('password-error').innerHTML = "6 characters minimum";
            valid = false ;
        }else{
            Element('password-error').innerHTML = "";
        }

        if(this.password.toString() != confrimPassword.toString()){
            Element('confirm-password-error').innerHTML = "The passwords do not match";
            valid = false ;
        }else{
            Element('confirm-password-error').innerHTML = "";
        }

        return valid;

    }

}

function signup(){

    let user =  new User(
        Element("first-name").value,
        Element("last-name").value,
        Element("other-name").value,
        Element("telephone").value,
        Element("email").value,
        Element("password").value
    );

    if(user.validate(Element("confirm-password").value)){

        alert("valid");

        console.log(user);

    }

}
