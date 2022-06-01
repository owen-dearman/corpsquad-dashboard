import {
  addClientsAndEmployeesToProjects,
  getNameOfEmployee,
  matchClientNameToId,
  matchEmployeeNamesToIds,
} from "./addClientsAndEmployeesToProjects";
import {
  fullClientInterface,
  fullEmployeeInterface,
  fullProjectInterface,
  projectInterface,
} from "./interfaces";

const projects: projectInterface[] = [
  {
    id: "1",
    clientId: "1",
    contract: { startDate: "n/a", endDate: "n/a", size: "n/a" },
    employeeIds: ["1", "2"],
  },
  {
    id: "2",
    clientId: "2",
    contract: { startDate: "n/a", endDate: "n/a", size: "n/a" },
    employeeIds: ["1", "3"],
  },
];

const fullProjects: fullProjectInterface[] = [
  {
    id: "1",
    client: { id: "1", name: "Inc" },
    contract: { startDate: "n/a", endDate: "n/a", size: "n/a" },
    employees: [
      { id: "1", name: "Ben" },
      { id: "2", name: "Laura" },
    ],
  },
  {
    id: "2",
    client: { id: "2", name: "Ltd" },
    contract: { startDate: "n/a", endDate: "n/a", size: "n/a" },
    employees: [
      { id: "1", name: "Ben" },
      { id: "3", name: "Herbert" },
    ],
  },
];

const employeeList: fullEmployeeInterface[] = [
  { id: "1", name: "Ben" },
  { id: "2", name: "Laura" },
  { id: "3", name: "Herbert" },
  { id: "4", name: "Sara" },
];
const clientList: fullClientInterface[] = [
  { id: "1", name: "Inc" },
  { id: "2", name: "Ltd" },
];

describe("suite of tests for ddClientsAndEmployeesToProjects", () => {
  test("should return all information collated", () =>
    expect(
      addClientsAndEmployeesToProjects(projects, clientList, employeeList)
    ).toStrictEqual(fullProjects));
  test("matchClientNameToId", () =>
    expect(matchClientNameToId("1", clientList)).toStrictEqual({
      id: "1",
      name: "Inc",
    }));
  test("matchEmployeeNameToId", () =>
    expect(matchEmployeeNamesToIds(["1", "4"], employeeList)).toStrictEqual([
      { id: "1", name: "Ben" },
      { id: "4", name: "Sara" },
    ]));
  test("getNameOfEmployee", () =>
    expect(getNameOfEmployee("1", employeeList)).toStrictEqual("Ben"));
});
