const dbf = require("./db/db-functions")

describe("Test db-functions", () => {
	it("should return data from getAllMessageData using username: admin", async () => {
		dbf.getAllMessageData({ username: 'admin' }, (err, docs) => {
			expect(docs).not.toEqual([])
		})
	})
})