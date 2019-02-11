class Office{
    constructor(){
        this.toast = new Toast();
    }
    contest(){
        this.toast.show('Contest request accepted');
    }
    vote(){
        this.toast.show('You have voted for Grace lungu', false);
    }
}
const office = new Office();