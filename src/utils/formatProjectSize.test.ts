import { formatProjectSize } from "./formatProjectSize";

describe("suite of tests for formatProjectSize()", () => {
  test("numbers should be formatted", () => {
    expect(formatProjectSize("123")).toBe("£123");
    expect(formatProjectSize("123.99")).toBe("£123.99");
    expect(formatProjectSize("123999.32")).toBe("£123,999.32");
    expect(formatProjectSize("45236.76")).toBe("£45,236.76");
  });
});
