class Account {
	constructor() {
		this.toast = new Toast();
		this.user = {
			isAdmin: true
		};
		this.init();
	}
	init() {
		if (!this.user.isAdmin) {
			document.querySelector('.adminOnly1').style.display = "none";
			document.querySelector('.adminOnly2').style.display = "none";
			document.querySelector('.adminOnly3').style.display = "none";
		}
	}
	saveSettings() {
		let user = {
			firstname: Element("first-name").value,
			lastname: Element("last-name").value,
			othername: Element("other-name").value,
			phoneNumber: Element("telephone").value
		}
		let valid = true;
		if (!RegExp(/^[a-zA-Z'-]{2,30}$/).test(user.firstname.toString().trim())) {
			Element('first-name-error').innerHTML = "Invalid first name";
			valid = false;
		} else {
			Element('first-name-error').innerHTML = "";
		}
		if (!isValidName(user.firstname)) {
			Element('first-name-error').innerHTML = "Invalid first name";
			valid = false;
		} else {
			Element('first-name-error').innerHTML = "";
		}
		if (!isValidName(user.lastname)) {
			Element('last-name-error').innerHTML = "Invalid last name";
			valid = false;
		} else {
			Element('last-name-error').innerHTML = "";
		}
		if (!isValidName(user.othername)) {
			Element('other-name-error').innerHTML = "Invalid other name";
			valid = false;
		} else {
			Element('other-name-error').innerHTML = "";
		}
		if (!RegExp(/^[0-9/+]{4,20}$/).test(user.phoneNumber.toString().trim())) {
			Element('telephone-error').innerHTML = "Invalid telephone number";
			valid = false;
		} else {
			Element('telephone-error').innerHTML = "";
		}
		if (valid) {
			this.toast.show("Settings saved", false);
			console.log(user);
		}
	}
	update(){
		this.toast.show('Profile updated',false)
	}
	delete(){
		this.toast.show('Profile deleted',false)
	}
}
let account = new Account();