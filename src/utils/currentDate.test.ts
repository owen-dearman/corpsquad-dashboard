import { currentDate } from "./currentDate";
import { expect } from "@jest/globals";

const todaysDate = new Date().toLocaleDateString();

describe("suite of tests for currentDate()", () => {
  test("today's date should be shown", () =>
    expect(currentDate()).toBe(todaysDate));
});
