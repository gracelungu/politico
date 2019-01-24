//Element selector
function Element(str){
    return document.getElementById(str);
}

// Menu
// Toggle the navigation when the menu button is clicked
function toggleMenu(){
    
    let nav = document.querySelector('section nav');

    if(nav.style.display == "none"){
        nav.style.display = "flex";
    }else{
        nav.style.display = "none";
    }

}if(window.innerWidth <= 1000){toggleMenu();}

//Toast
class Toast{

    constructor(){
        this.create();
        this.toast = Element('toast');
    }

    create(){
        document.querySelector('body')
        .innerHTML += `
            <div id="toast" class=" flex justify-between align-center shadow-1">
                <span id="toast-text"></span>
                <img width="auto" height="15px" src="../assets/imgs/icons/cancel.png" alt="" id="toast-cancel" onclick="toast.cancel()">
            </div>
        `;
    }

    show(message, canCancel = false){

        //Display the toast and set the message
        Element('toast-text').innerHTML = message;
        this.toast.style.bottom = "100px";
        
        //Hides the toast if canCancel is set to false
        if(!canCancel){
            setTimeout(()=>{
                this.cancel();
            },3000);
        }

    }

    cancel(){
        this.toast.style.bottom = "-100px";  
    }

} 
