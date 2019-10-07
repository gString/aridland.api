import constants from "../src/constants";
import { doesEntryExist } from "../src/utils";
import mock from "./__mocks__/mock-request";


jest.mock('../src/db', () => {
	const constants = require("../src/constants");
	return { findAll: jest.fn( model => {
		const found = constants.default.items.ITEMS_FETCHED_SUCCESSFULLY;
		switch(model) {
		    case "notFound":
		        return { status: "Just any status" };
		    case "emptyList":
		        return {
		        	status: found,
					result: []
		        };
		    case "singleItem":
		        return {
		        	status: found,
					result: [ { id: "fakeId"} ]
		        };
		    case "multiItems":
		        return {
		        	status: found,
					result: [ { id: "fakeId"},{ id: "fakeId"} ]
		        };
		    default:
				return 42
		}
		} ) }
});

const fakeEntry = {
	ENG: "fake",
	SPA: "efake"
}


/* utils.doesEntryExist */
describe("Test utils.doesEntryExist", () => {
	describe("It should return null", () => {
		test("Upon receiving any status other than ITEMS_FETCHED_SUCCESSFULLY",
			async () => {
				expect.assertions(1);
				const result = await doesEntryExist(
					fakeEntry,
					"fakeKey",
					"notFound",
					"fakeId");
				expect(result).toBeNull();
			}
		);
		test("Upon receiving ITEMS_FETCHED_SUCCESSFULLY status and empty result list",
			async () => {
				const result = await doesEntryExist(
					fakeEntry,
					"fakeKey",
					"emptyList",
					"fakeId");
				expect(result).toBeNull();
			}
		);
		test("Upon receiving ITEMS_FETCHED_SUCCESSFULLY status and the only item on list has the same id as id argument",
			async () => {
				const result = await doesEntryExist(
					fakeEntry,
					"fakeKey",
					"singleItem",
					"fakeId");
				expect(result).toBeNull();
			}
		);
	});
	describe("It should return 'Already exist'", () => {
		test("There's more than one item in the result",
			async () => {
				const result = await doesEntryExist(
					fakeEntry,
					"fakeKey",
					"multiItems",
					"fakeId");
				expect(result).toEqual(expect.stringContaining("Already exist"));
			}
		);
		test("There's one item in the result but there's no id",
			async () => {
				const result = await doesEntryExist(
					fakeEntry,
					"fakeKey",
					"singleItem");
				expect(result).toEqual(expect.stringContaining("Already exist"));
			}
		);
		test("There's one item in the result but its' id don't match",
			async () => {
				const result = await doesEntryExist(
					fakeEntry,
					"fakeKey",
					"singleItem",
					"anotherFakeId");
				expect(result).toEqual(expect.stringContaining("Already exist"));
			}
		);
	})
	});
