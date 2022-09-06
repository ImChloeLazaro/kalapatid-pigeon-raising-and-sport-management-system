const dbf = require("./db/db-functions")

describe("Test db-functions", () => {
	it("should return data from getAccountDataBy using username: admin", async () => {
		dbf.getAccountDataBy({ username: 'admin' }, (err, docs) => {
			expect(docs).toEqual(null)
		})
	})
})