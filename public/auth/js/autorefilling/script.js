//NOTE: This is the source file for the frontent javascript which use for behavior of the client

$(function () {
	console.log("This is Client-side Authentication Script..")
	if (sessionStorage.chkbx && sessionStorage.chkbx != '') {
		$('#rememberme').attr('checked', 'checked')
		$('#username').val(sessionStorage.username)
		$('#password').val(sessionStorage.password)
	} else {
		$('#rememberme').removeAttr('checked')
		$('#username').val('')
		$('#password').val('')
	}
	$('#rememberme').click(function () {

		if ($('#rememberme').is(':checked')) {

			sessionStorage.username = $('#username').val()
			sessionStorage.password = $('#password').val()
			sessionStorage.chkbx = $('#rememberme').val()
		} else {
			sessionStorage.username = ''
			sessionStorage.password = ''
			sessionStorage.chkbx = ''
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

