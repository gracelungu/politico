// Element selector
function Element(str) {
	return document.getElementById(str);
}
// Menu
// Toggle the navigation when the menu button is clicked
function toggleMenu() {
	const nav = document.querySelector('section nav');
	if (nav.style.display == 'none') {
		nav.style.display = 'flex';
	} else {
		nav.style.display = 'none';
	}
}
try {
	if (window.innerWidth <= 1000) {
		toggleMenu();
	}
} catch (e) {};
// Toast
class Toast {
	constructor() {
		this.create();
		this.toast = Element('toast');
	}
	create() {
		document.querySelector('body').innerHTML += `
            <div id="toast" class=" flex justify-between align-center shadow-1">
                <span id="toast-text"></span>
                <img width="auto" height="15px" src="../assets/imgs/icons/cancel.png" alt="" id="toast-cancel" onclick="toast.cancel()">
            </div>
        `;
	}
	show(message, canCancel = false) {
		// Display the toast and set the message
		Element('toast-text').innerHTML = message;
		this.toast.style.bottom = '100px';
		// Hides the toast if canCancel is set to false
		if (!canCancel) {
			setTimeout(() => {
				this.cancel();
			}, 3000);
		}
	}
	cancel() {
		this.toast.style.bottom = '-100px';
	}
}
//VALIDATE
function isValidEmail(email) {
	if (!RegExp(/^[a-zA-Z-._]+@[a-zA-Z-._]+.[a-zA-Z]{2,4}$/).test(email.toString().toLowerCase().trim())) {
		return false;
	}
	return true;
}

function isValidName(name) {
	if (!RegExp(/^[a-zA-Z'-]{2,30}$/).test(name.toString().trim())) {
		return false;
	}
	return true;
}

function isValidPhoneNumber(phoneNumber) {
	if (!RegExp(/^[0-9/+]{4,20}$/).test(phoneNumber.toString().trim())) {
		return false;
	}
	return true;
}