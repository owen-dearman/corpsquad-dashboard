import { State } from "../App";
import { convertDateToComparable } from "./convertDateToComparable";
import { fullProjectInterface } from "./interfaces";

/*
  filters?: {
    projectSize: { min: null; max: null };
    clients: [];
    employees: [];
    timeFrame: { start: null; end: null };
  };
*/

export function applyFilters(
  projectData: fullProjectInterface[],
  filters: State["filters"]
): fullProjectInterface[] {
  projectData = filterProjectSize(projectData, filters.projectSize);
  projectData = filterClient(projectData, filters.clients);
  projectData = filterEmployee(projectData, filters.employees);
  projectData = filterDates(projectData, filters.timeFrame);
  return projectData;
}

function filterProjectSize(
  data: fullProjectInterface[],
  filters: { min: string | null; max: string | null }
): fullProjectInterface[] {
  if (typeof filters.min === "string") {
    const minimum = parseFloat(filters.min);
    data = data.filter((proj) => parseFloat(proj.contract.size) > minimum);
  }
  if (typeof filters.max === "string") {
    const maximum = parseFloat(filters.max);
    data = data.filter((proj) => parseFloat(proj.contract.size) > maximum);
  }
  return data;
}

function filterClient(
  data: fullProjectInterface[],
  clientIdFilter: string | null
): fullProjectInterface[] {
  if (!clientIdFilter) {
    return data;
  }
  return data.filter((proj) => clientIdFilter.includes(proj.client.id));
}

function filterEmployee(
  data: fullProjectInterface[],
  employeeIdFilter: string[]
): fullProjectInterface[] {
  if (employeeIdFilter.length === 0) {
    return data;
  }
  const projectList = [];
  for (const project of data) {
    const arrayOfEmployees: string[] = [];
    for (const employee of project.employees) {
      arrayOfEmployees.push(employee.id);
    }
    if (employeeIdFilter.every((id) => arrayOfEmployees.includes(id))) {
      projectList.push(project);
    }
  }
  return projectList;
}

function filterDates(
  data: fullProjectInterface[],
  startEndDates: {
    startBefore: null | string;
    startAfter: null | string;
    endBefore: null | string;
    endAfter: null | string;
  }
): fullProjectInterface[] {
  if (typeof startEndDates.startBefore === "string") {
    const startDate = convertDateToComparable(startEndDates.startBefore);
    data = data.filter((project) => {
      const projStart = convertDateToComparable(project.contract.startDate);
      return projStart < startDate;
    });
  }
  if (typeof startEndDates.startAfter === "string") {
    const startDate = convertDateToComparable(startEndDates.startAfter);
    data = data.filter((project) => {
      const projStart = convertDateToComparable(project.contract.startDate);
      return projStart > startDate;
    });
  }
  if (typeof startEndDates.endBefore === "string") {
    const endDate = convertDateToComparable(startEndDates.endBefore);
    data = data.filter((project) => {
      const projEnd = convertDateToComparable(project.contract.endDate);
      return projEnd < endDate;
    });
  }
  if (typeof startEndDates.endAfter === "string") {
    const endDate = convertDateToComparable(startEndDates.endAfter);
    data = data.filter((project) => {
      const projEnd = convertDateToComparable(project.contract.endDate);
      return projEnd > endDate;
    });
  }
  return data;
}
