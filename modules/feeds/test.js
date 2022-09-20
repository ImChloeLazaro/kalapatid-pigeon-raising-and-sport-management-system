const dbf = require("./db/db-functions")

describe("Test db-functions", () => {
	it("should return data from getAllPostData using username: admin", async () => {
		dbf.getAllPostData({ username: 'admin' }, (err, docs) => {
			expect(docs).not.toEqual([])
		})
	})
})