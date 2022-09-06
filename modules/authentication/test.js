const dbo = require('./db/db-operation')
const db = require('./db/db')

describe("Test Database Connection", () => {
	it("db should not return null", async () => {
		expect(db).not.toBeNull()
	})

	it("insertAccount should return error as null", async () => {
		dbo.insertAccount({ 'test': "test" }, (err) => {
			expect(err).toBeNull()
		})
	})
})


// insertAccount: insertAccount,
// 	getAllAcountData: getAllAcountData,
// 	getAcountDataByEmail: getAcountDataByEmail,
// 	getAcountDataByCode: getAcountDataByCode,
// 	updateAccount: updateAccount,

// 	insertAddress: insertAddress,
// 	getAddressData: getAddressData,
// 	getAddressDataByID: getAddressDataByID,