const dbf = require('../../db/db-functions')

const registrationSchema = {
	username: {
		isLength: { min: 5, max: 20 },
		isAlphanumeric: true,
		trim: true,
		escape: true,
		custom: {
			options: (value) => {
				console.log("username: ", value);
				return new Promise((resolve, reject) => {
					dbf.checkUsername(value, (err, result) => {
						if (err) {
							reject(new Error("Database error"));
						} else if (result != null && result.username === value) {
							reject(new Error("Username already in use"));
						} else {
							resolve(true);
						}
					})
				})
			},
		}
	},
	firstname: {
		notEmpty: true,
		errorMessage: "First	name is required"
	},
	lastname: {
		notEmpty: true,
		errorMessage: "First	name is required"
	},
	barangay: {
		notEmpty: true,
		errorMessage: "Barangay is required"
	},
	townCity: {
		notEmpty: true,
		errorMessage: "Town/City is required"
	},
	province: {
		notEmpty: true,
		errorMessage: "Province is required"
	},
	birthday: {
		notEmpty: true,
		errorMessage: "Birthday is required"
	},
	phone: {
		notEmpty: true,
		errorMessage: "Phone is required"
	},
	email: {
		isEmail: true,
		normalizeEmail: true,
		trim: true,
		escape: true,
		custom: {
			options: (value) => {
				console.log("Email: ", value);
				return new Promise((resolve, reject) => {
					dbf.checkEmail(value, (err, result) => {
						if (err) {
							reject(new Error("Database error"));
						} else if (result != null && result.email === value) {
							reject(new Error("Email already in use"));
						} else {
							resolve(true);
						}
					})
				})
			},
		}
	},
	password: {
		isLength: { min: 5, max: 20 },
		trim: true,
		isStrongPassword: {
			minLength: 8,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 1,
			returnScore: false,
			pointsPerUnique: 1,
			pointsPerRepeat: 0.5,
			pointsForContainingLower: 10,
			pointsForContainingUpper: 10,
			pointsForContainingNumber: 10,
			pointsForContainingSymbol: 10,
		},
		errorMessage: "Password must be at least 8 characters long, contain at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol"
	}
}






module.exports = registrationSchema;