const db = require("./db/db")

describe("get all clubs", () => {
	it("should return all clubs", async () => {
		db.getCollection('clubs', (err, docs) => {
			expect(docs).toEqual(null)
		})
	})
})