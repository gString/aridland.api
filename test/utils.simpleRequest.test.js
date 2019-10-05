import constants from "../src/constants";
import { simpleWriteRequest } from "../src/utils";
import mock from "./__mocks__/mock-request";

/*  utils.simpleWriteRequest  */
describe("Test utils.simpleWriteRequest", () => {
	describe("Upon receiving success-reply", () => {
		test("It should return status 201",
			async () => {
				const result = await simpleWriteRequest(
					"fakedata",
					mock.itemCreated,
					"fakeType"
				);
				expect(result.status).toBe(201);
			});
		test("It should return message that includes the success msg",
			async () => {
				const result = await simpleWriteRequest(
					"fakedata",
					mock.itemCreated,
					"fakeType"
				);
				expect(result.message).toEqual(expect.stringContaining(constants.items.ITEM_CREATED_SUCCESSFULLY));
			});
	});
	describe("Upon receiving item-exist reply", () => {
		test("It should return status 409",
			async () => {
				const result = await simpleWriteRequest(
					"fakeData",
					mock.itemExist,
					"fakeType"
				);
				expect(result.status).toBe(409);
		});
		test("It should return message that includes item-exist msg",
			async () => {
				const result = await simpleWriteRequest(
					"fakeData",
					mock.itemExist,
					"fakeType"
				);
				expect(result.message).toEqual(expect.stringContaining(constants.items.ITEM_EXIST));
		});
	});
	describe("Upon failure", () => {
		test("It should return the default response object in case of an unrecognised status",
			async () => {
				const result = await simpleWriteRequest(
					"fakeData",
					mock.unrecognisedResponse,
					"fakeType"
				);
				expect(result).toStrictEqual(constants.responseObj);
		});
		test("It should return the default response object when the service fails",
			async () => {
				const result = await simpleWriteRequest(
					"fakeData",
					mock.failedRequest,
					"fakeType"
				);
				expect(result).toStrictEqual(constants.responseObj);
		});
	});
});