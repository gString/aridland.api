import constants from "../src/constants";
import { updateRequest } from "../src/utils";
import mock from "./__mocks__/mock-request";

/*  utils.updateRequest  */
describe("Test utils.updateRequest", () => {
	describe("Upon receiving reply", () => {
		test("It should return status 200 when itemCreated",
			async () => {
				const result = await updateRequest(
					"fakedata",
					"fakeID",
					mock.itemModified,
					"fakeType"
				);
				expect(result.status).toBe(200);
			});
		test("It should return message that includes the success msg",
			async () => {
				const result = await updateRequest(
					"fakedata",
					"fakeID",
					mock.itemModified,
					"fakeType"
				);
				expect(result.message)
					.toEqual(expect.stringContaining(constants.items.ITEM_UPDATED_SUCCESSFULLY));
			});
	});
	describe("Upon receiving item-not-found reply", () => {
		test("It should return status 404",
			async () => {
				const result = await updateRequest(
					"fakeData",
					"fakeID",
					mock.notFound,
					"fakeType"
				);
				expect(result.status).toBe(404);
		});
		test("It should return message that includes item-not-found msg",
			async () => {
				const result = await updateRequest(
					"fakeData",
					"fakeID",
					mock.notFound,
					"fakeType"
				);
				expect(result.message)
					.toEqual(expect.stringContaining(constants.items.ITEM_NOT_FOUND));
		});
	});
	describe("Upon receiving data-not-unique reply", () => {
		test("It should return status 404",
			async () => {
				const result = await updateRequest(
					"fakeData",
					"fakeID",
					mock.dataNotUnique,
					"fakeType"
				);
				expect(result.status).toBe(404);
		});
		test("It should return message that includes data-not-unique msg",
			async () => {
				const result = await updateRequest(
					"fakeData",
					"fakeID",
					mock.dataNotUnique,
					"fakeType"
				);
				console.log('result',result);
				expect(result.message)
					.toEqual(expect.stringContaining(constants.DB.DATA_NOT_UNIQUE));
		});
	});
	describe("Upon failure", () => {
		test("It should return the default response object in case of an unrecognised status",
			async () => {
				const result = await updateRequest(
					"fakeData",
					"fakeID",
					mock.unrecognisedResponse,
					"fakeType"
				);
				expect(result).toStrictEqual(constants.responseObj);
		});
		test("It should return the default response object when the service fails",
			async () => {
				const result = await updateRequest(
					"fakeData",
					"fakeID",
					mock.failedRequest,
					"fakeType"
				);
				expect(result).toStrictEqual(constants.responseObj);
		});
	});
});