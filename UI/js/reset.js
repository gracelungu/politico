function sendEmail(){
    const email = Element('email').value;
    const toast = new Toast();
    if(isValidEmail(email)){
        toast.show("The email was successfully sent!");
    }else{
        Element('email-error').innerHTML = 'Invalid email adress';
    }
}