function signin() {
	let user = {
		email: Element("email").value,
		password: Element("password").value
	}
	let valid = true;
	if (!isValidEmail(user.email)) {
		Element('email-error').innerHTML = "Invalid email adress";
		valid = false;
	} else {
		Element('email-error').innerHTML = "";
	}
	if (user.password.toString().length < 6) {
		Element('password-error').innerHTML = "6 characters minimum";
		valid = false;
	} else {
		Element('password-error').innerHTML = "";
	}
	if (valid) {
		console.log(user);
		document.location.assign("../html/account.html");
	}
}