import { convertDateToComparable } from "./convertDateToComparable";
import { expect } from "@jest/globals";

describe("suite of tests for convertDateToComparable()", () => {
  test("should return comparable dates", () => {
    expect(convertDateToComparable("Mon Apr 15 2022")).toStrictEqual(
      "20220415"
    );
    expect(convertDateToComparable("Thu Nov 09 2025")).toStrictEqual(
      "20251109"
    );
    expect(convertDateToComparable("Sun Jan 01 1998")).toStrictEqual(
      "19980101"
    );
  });
});
