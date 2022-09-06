const dbf = require("./db/db-functions")

describe("Test db-functions", () => {
	it("should return data from getAllChatData using username: admin", async () => {
		dbf.getAllChatData({ username: 'admin' }, (err, docs) => {
			expect(docs).not.toEqual(null)
		})
	})
})

