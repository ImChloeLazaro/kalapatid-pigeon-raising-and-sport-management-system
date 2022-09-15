//NOTE: This is the source file for the frontent javascript which use for behavior of the client

$(function () {
	console.log("This is Client-side Authentication Script..")
	if (localStorage.chkbx && localStorage.chkbx != '') {
		$('#rememberme').attr('checked', 'checked')
		$('#username').val(localStorage.username)
		$('#password').val(localStorage.password)
	} else {
		$('#rememberme').removeAttr('checked')
		$('#username').val('')
		$('#password').val('')
	}
	$('#rememberme').click(function () {

		if ($('#rememberme').is(':checked')) {

			localStorage.username = $('#username').val()
			localStorage.password = $('#password').val()
			localStorage.chkbx = $('#rememberme').val()
		} else {
			localStorage.username = ''
			localStorage.password = ''
			localStorage.chkbx = ''
		}
	})
	if (!navigator.geolocation) {
	} else {
		navigator.geolocation.getCurrentPosition(function (position) {
			let { latitude, longitude } = position.coords;
			$('#info-location').attr("data-lat", latitude);
			$('#info-location').attr("data-long", longitude);
		});
	}


})

