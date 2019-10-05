import constants from "../src/constants";
import { getRequest } from "../src/utils";
import mock from "./__mocks__/mock-request";

/* utils.getRequest */
describe("Test utils.getRequest", () => {
	describe("Upon receiving reply", () => {
		test("It should return status 200 for ENTITY_FETCHED or ENTITIES_FETCHED",
			async () => {
				const resultSingle = await getRequest(
					mock.fetchItem,
					"fakeType",
					"fakeID"
				);
				// console.log('resultSingle',resultSingle);
				const result = await getRequest(
					mock.fetchItems,
					"fakeType"
				);
				expect(resultSingle.status).toBe(200);
				expect(result.status).toBe(200);
			}
		);
		test("It should return the results' data (object/array)",
			async () => {
				const resultSingle = await getRequest(
					mock.fetchItem,
					"fakeType",
					"fakeID"
				);
				// console.log('resultSingle',resultSingle);
				const result = await getRequest(
					mock.fetchItems,
					"fakeType"
				);
				expect(resultSingle.data).toHaveProperty("_id");
				expect(result.data instanceof Array).toBeTruthy();
			}
		);
		test("It should return status 404 for not-found reply",
			async () => {
				const result = await getRequest(
					mock.notFound,
					"fakeType"
				);
				expect(result.status).toBe(404);
			}
		);
	});
	describe("Upon failure", () => {
		test("It should return the default response object in case of an unrecognised status",
			async () => {
				const result = await getRequest(
					mock.unrecognisedResponse,
					"fakeType"
				);
				expect(result).toStrictEqual(constants.responseObj);
			});
		test("It should return the default response object when the service fails",
			async () => {
				const result = await getRequest(
					mock.failedRequest,
					"fakeType"
				);
				expect(result).toStrictEqual(constants.responseObj);
			});
	});
	
});
