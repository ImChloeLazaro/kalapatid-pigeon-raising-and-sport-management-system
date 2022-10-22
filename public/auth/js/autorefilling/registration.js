$(function () {
	console.log("registration.js loaded");
	let rusername = $('#rusername')
	let rpassword = $('#rpassword')
	let firstname = $("#firstname")
	let middlename = $("#middlename")
	let lastname = $("#lastname")
	let birthday = $("#birthday")
	let phone = $("#phone")
	let email = $("#email")
	let barangay = $("#brgy")
	let townCity = $("#citymun")
	let province = $("#province")

	$("#province").val("Camarines Sur")
	$("#citymun").val("Select City/Municipality")
	$("#brgy").val("Select Barangay")

	$("#register").click(function () {
		localStorage.rusername = rusername.val()
		localStorage.rpassword = rpassword.val()
		localStorage.firstname = firstname.val()
		localStorage.middlename = middlename.val()
		localStorage.lastname = lastname.val()
		localStorage.birthday = birthday.val()
		localStorage.phone = phone.val()
		localStorage.email = email.val()
		localStorage.barangay = barangay.val()
		localStorage.townCity = townCity.val()
		localStorage.province = province.val()
	})

	$('#rusername').val(localStorage.rusername)
	$('#rpassword').val(localStorage.rpassword)
	$("#firstname").val(localStorage.firstname)
	$("#middlename").val(localStorage.middlename)
	$("#lastname").val(localStorage.lastname)
	$("#birthday").val(localStorage.birthday)
	$("#phone").val(localStorage.phone)
	$("#email").val(localStorage.email)
	$("#brgy").val(localStorage.barangay)
	$("#citymun").val(localStorage.townCity)
})


function verifyEmail(url) {
	let email = $("#email").val();
	let fullUrl = url + email;
	// console.log(url);
	// $.getJSON(fullUrl, function (data) {
	// 	if (data.deliverability === "DELIVERABLE") {
	// 		emailVerifier(data.deliverability)
	// 	} else {
	// 		emailVerifier(data.deliverability)
	// 	}
	// })
	var myHeaders = new Headers();
	myHeaders.append("apikey", "IFYOXYapu2AOtV4uKxPpIwYWQtdf8bg3");

	var requestOptions = {
		method: 'GET',
		redirect: 'follow',
		headers: myHeaders
	};

	fetch(fullUrl, requestOptions)
		.then(response => response.text())
		.then(result => {
			let data = JSON.parse(result)
			if (data.smtp_check) {
				emailVerifier(true)
			} else {
				emailVerifier(false)
			}
		})
		.catch(error => console.log('error', error));
}


function emailVerifier(value) {
	let icheck = $('<i class="bi bi-check2-circle my-2">')
	let ierror = $('<i class="bi bi-x-circle-fill my-2">')

	let emailValid = "Email verified";
	let emailInvalid = "Email invalid";

	if (value) {
		let p = $('<p class="text-success me-2">')
		p.text(emailValid)
		p.append(icheck)
		$("#email-verifier").html(p)
	} else {
		let p = $('<p class="text-danger me-2">')
		p.append(emailInvalid)
		p.append(ierror)
		$("#email-verifier").html(p)
	}
}



function ConvertTitleCase(str) {
	const strArr = str.toLowerCase().split(" ");
	for (let i = 0; i < strArr.length; i++) {
		strArr[i] = strArr[i][0].toUpperCase() + strArr[i].slice(1);
	}
	return strArr.join(" ");
}