 import constants from "../src/constants";
import { deleteRequest } from "../src/utils";
import mock from "./__mocks__/mock-request";

/* utils.deleteRequest */
describe("Test utils.deleteRequest", () => {
	describe("Upon receiving successnreply", () => {
		test("It should return status 200",
			async () => {
				const result = await deleteRequest(
					mock.itemDeleted,
					"fakeType",
					"fakeID"
				);
				expect(result.status).toBe(200);
			}
		);
		test("It should return message that includes the success msg",
			async () => {
				const result = await deleteRequest(
					mock.itemDeleted,
					"fakeType",
					"fakeID"
				);
				expect(result.message).toEqual(expect.stringContaining(constants.items.ITEM_DELETED_SUCCESSFULLY));
			}
		);
	});
	describe("Upon failure", () => {
		test("It should return status 404 for not-found reply",
			async () => {
				const result = await deleteRequest(
					mock.notFound,
					"fakeType",
					"fakeID"
				);
				expect(result.status).toBe(404);
			}
		);
		test("It should return not-found message for not-found reply",
			async () => {
				const result = await deleteRequest(
					mock.notFound,
					"fakeType",
					"fakeID"
				);
				expect(result.message).toEqual(expect.stringContaining(constants.items.ITEM_NOT_FOUND));
			}
		);
		test("It should return the default response object in case of an unrecognised status",
			async () => {
				const result = await deleteRequest(
					mock.unrecognisedResponse,
					"fakeType",
					"fakeID"
				);
				expect(result).toStrictEqual(constants.responseObj);
			});
		test("It should return the default response object when the service fails",
			async () => {
				const result = await deleteRequest(
					mock.failedRequest,
					"fakeType",
					"fakeID"
				);
				expect(result).toStrictEqual(constants.responseObj);
			});
	});
});
