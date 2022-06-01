import { getEmployeesForThisClient } from "./getEmployeesForThisClient";

const clientProjects = [
  {
    id: "1",
    client: { id: "1", name: "Test" },
    contract: { startDate: "n/a", endDate: "n/a", size: "n/a" },
    employees: [
      { id: "1", name: "Ben" },
      { id: "2", name: "Laura" },
    ],
  },
  {
    id: "1",
    client: { id: "1", name: "Test" },
    contract: { startDate: "n/a", endDate: "n/a", size: "n/a" },
    employees: [
      { id: "1", name: "Ben" },
      { id: "3", name: "Herbert" },
    ],
  },
];

const employeeList = [
  { id: "1", name: "Ben" },
  { id: "2", name: "Laura" },
  { id: "3", name: "Herbert" },
  { id: "4", name: "Sara" },
];

describe("suite of tests for getEmployeesForThisClient", () => {
  test("should return single instance of employees for client projects", () =>
    expect(
      getEmployeesForThisClient(clientProjects, employeeList)
    ).toStrictEqual([
      { id: "1", name: "Ben" },
      { id: "2", name: "Laura" },
      { id: "3", name: "Herbert" },
    ]));
});
