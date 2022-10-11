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
	let barangay = $("#barangay")
	let townCity = $("#townCity")
	let province = $("#province")

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
	$("#barangay").val(localStorage.barangay)
	$("#townCity").val(localStorage.townCity)
	$("#province").val(localStorage.province)
})


function verifyEmail(url) {
	let email = $("#email").val();
	let fullUrl = url + email;
	console.log(url);
	$.getJSON(fullUrl, function (data) {
		if (data.deliverability === "DELIVERABLE") {
			swal({ title: "Email Varified!", icon: "success", button: "Done" })
		} else {
			swal({ title: "Email Not Valid!", icon: "error", button: "Done" })
		}
	})
}
