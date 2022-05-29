import { getAverageRevenue, getTotalRevenue } from "./projectStats";

const testData = [
  {
    id: "1",
    client: { id: "1", name: "n/a" },
    employees: [{ id: "1", name: "n/a" }],
    contract: {
      startDate: "n/a",
      endDate: "n/a",
      size: "123",
    },
  },
  {
    id: "2",
    client: { id: "1", name: "n/a" },
    employees: [{ id: "1", name: "n/a" }],
    contract: {
      startDate: "n/a",
      endDate: "n/a",
      size: "20000",
    },
  },
  {
    id: "3",
    client: { id: "1", name: "n/a" },
    employees: [{ id: "1", name: "n/a" }],
    contract: {
      startDate: "n/a",
      endDate: "n/a",
      size: "45.70",
    },
  },
];

describe("suite of tests for getTotalRevenue() and getAverageRevenue()", () => {
  test("get average revenue should calculate mean", () => {
    expect(getAverageRevenue(2, 10)).toStrictEqual(5);
    expect(getAverageRevenue(150, 12345)).toStrictEqual(82.3);
  });
  test("get total revenue should calculate mean", () => {
    expect(getTotalRevenue(testData)).toStrictEqual(20168.7);
  });
});
