function save(){

    let user = {
        firstname:Element("first-name").value,
        lastname:Element("last-name").value,
        othername:Element("other-name").value,
        phoneNumber:Element("telephone").value
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

    if(!RegExp(/^[a-zA-Z'-]{2,30}$/).test(user.othername.toString().trim())){
        Element('other-name-error').innerHTML = "Invalid other name";
        valid = false ;
    }else{
        Element('other-name-error').innerHTML = "";
    }

    if(!RegExp(/^[0-9/+]{4,20}$/).test(user.phoneNumber.toString().trim())){
        Element('telephone-error').innerHTML = "Invalid telephone number";
        valid = false ;
    }else{
        Element('telephone-error').innerHTML = "";
    }

    if(valid){

        alert("valid");

        console.log(user);

    }

}



