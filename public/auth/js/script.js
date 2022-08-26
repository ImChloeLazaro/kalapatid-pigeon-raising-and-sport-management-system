//NOTE: This is the source file for the frontent javascript which use for behavior of the client






$(function () {
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
})

