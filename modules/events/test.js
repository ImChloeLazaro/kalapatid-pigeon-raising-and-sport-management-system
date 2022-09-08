const dbf = require("./db/db-functions")

describe("Test db-functions", () => {
	it("should return data from getAllEventDataBy using username: admin", async () => {
		dbf.getAllEventDataBy({ username: 'admin' }, (err, docs) => {
			expect(docs).not.toEqual([])
		})
	})
})

