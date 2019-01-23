//Element selector
function Element(str){
    return document.getElementById(str);
}

// Menu
// Toggle the navigation when the menu button is clicked
function toggleMenu(){
    
    let nav = document.querySelector('section nav');

    console.log(nav.style.display);

    if(nav.style.display == "none"){
        nav.style.display = "flex";
    }else{
        nav.style.display = "none";
    }

}if(window.innerWidth <= 1000){toggleMenu();}
