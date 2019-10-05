import constants from "../src/constants";
import { doesEntryExist } from "../src/utils";
import mock from "./__mocks__/mock-request";
import DBManger from "./__mocks__/DBManger";


/* utils.doesEntryExist */
describe("Test utils.doesEntryExist", () => {
	describe("Upon receiving successnreply", () => {
		test("It should run fake db",
			async () => {
				const db = new DBManger();
				const result = await db.start();
				console.log('doesEntryExist result',result);
				expect(result).toBe(200);
			}
		);
	});
});
