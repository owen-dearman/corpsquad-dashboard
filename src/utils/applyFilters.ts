import { State } from "../App";
import { convertDateToComparable } from "./convertDateToComparable";
import { getEmployeeProjects } from "./getEmployeeProjects";
import { fullProjectInterface } from "./interfaces";

/*
  filters?: {
    projectSize: { min: null; max: null };
    clients: [];
    employees: [];
    timeFrame: { start: null; end: null };
  };
*/

export function applyFilters(data: State): fullProjectInterface[] {
  let projectData = data.projectData;
  const filters = data.filters;
  if (filters) {
    console.log("prefilters", projectData);
    projectData = filterProjectSize(projectData, filters.projectSize);
    console.log("projectSize", projectData);
    projectData = filterClient(projectData, filters.clients);
    console.log("clients", projectData);
    projectData = filterEmployee(projectData, filters.employees);
    console.log("employee", projectData);
    projectData = filterDates(projectData, filters.timeFrame);
    console.log("dates", projectData);
    return projectData;
  } else {
    return projectData;
  }
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
  clientIdFilter: string[]
): fullProjectInterface[] {
  if (clientIdFilter.length === 0) {
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
  for (const id of employeeIdFilter) {
    data = getEmployeeProjects(data, id);
  }
  return data;
}

function filterDates(
  data: fullProjectInterface[],
  startEndDates: { start: string | null; end: string | null }
): fullProjectInterface[] {
  if (typeof startEndDates.start === "string") {
    const startDate = convertDateToComparable(startEndDates.start);
    data.filter((project) => {
      const projStart = convertDateToComparable(project.contract.startDate);
      return projStart > startDate;
    });
  }
  if (typeof startEndDates.end === "string") {
    const endDate = convertDateToComparable(startEndDates.end);
    data.filter((project) => {
      const projEnd = convertDateToComparable(project.contract.endDate);
      return projEnd < endDate;
    });
  }
  return data;
}
