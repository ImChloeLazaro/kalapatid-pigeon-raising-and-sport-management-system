//NOTE:This source file contains the models of the data that will use to in a database.

//imports

function Account(id, firstName, middleName, lastName, birthday, recoveryCode, phone, email, username, password) {
	return {
		_id: id,
		firstName: firstName,
		middleName: middleName,
		lastName: lastName,
		birthday: birthday,
		recoveryCode: recoveryCode,
		phone: phone,
		email: email,
		username: username,
		password: password,
	}

}

function Address(acc_id, houseAddr, town, province) {
	return {
		acc_id: acc_id,
		houseAddr: houseAddr,
		town: town,
		province: province,
	}

}

function OnlineUser(acc_id) {
	return {
		acc_id: acc_id
	}
}


module.exports = {
	Account: Account,
	Address: Address
}