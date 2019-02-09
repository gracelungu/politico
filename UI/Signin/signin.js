function signin(){

    let user = {
        email:Element("email").value,
        password:Element("password").value
    }

    let valid = true;

    if(!RegExp(/^[a-zA-Z-._]+@[a-zA-Z-._]+.[a-zA-Z]{2,4}$/).test(user.email.toString().toLowerCase().trim())){
        Element('email-error').innerHTML = "Invalid email ";
        valid = false ;
    }else{
        Element('email-error').innerHTML = "";
    }

    if(user.password.toString().length < 6){
        Element('password-error').innerHTML = "6 characters minimum";
        valid = false ;
    }else{
        Element('password-error').innerHTML = "";
    }

    if(valid){

        console.log(user);
        document.location.assign("../Account/account.html");

    }

}