class Offices {
	constructor() {
		this.createoffice = Element('create-party');
		this.init();
	}
	init() {
		this.createoffice.style.display = "none";
	}
	toggleCreation() {
		if (this.createoffice.style.display == "block") {
			this.createoffice.style.display = "none";
			Element("create-btn-icon").style.display = "block";
			Element("create-btn-text").innerHTML = "CREATE A PARTY";
		} else {
			this.createoffice.style.display = "block";
			Element("create-btn-icon").style.display = "none";
			Element("create-btn-text").innerHTML = `<img width="auto" height="12px" src="../assets/imgs/icons/up.png" alt=""/> `;
		}
	}
	saveOffice() {
		let office = {
			name: Element("name").value,
			type: Element("type").value
		}
		let valid = true;
		if (!RegExp(/^[a-zA-Z0-9'-/,\s]{2,30}$/).test(office.name.toString().trim())) {
			Element('name-error').innerHTML = "Invalid name";
			valid = false;
		} else {
			Element('name-error').innerHTML = "";
		}
		if (!RegExp(/^[a-zA-Z0-9'-/,\s]{2,50}$/).test(office.type.toString().trim())) {
			Element('type-error').innerHTML = "Invalid adress";
			valid = false;
		} else {
			Element('type-error').innerHTML = "";
		}
		if (valid) {
			console.log(office);
		}
	}
}
let offices = new Offices();
//Preview
document.querySelector(".item").addEventListener("click", () => {
	document.location.assign("../html/office.html");
});