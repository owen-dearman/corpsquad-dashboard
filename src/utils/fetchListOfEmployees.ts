import axios from "axios";
import { fullEmployeeInterface } from "./interfaces";

/**
 *
 * @returns list of all employees with name and id
 */

export async function fetchListOfEmployees(): Promise<fullEmployeeInterface[]> {
  const employeeList = await axios.get(
    "https://consulting-projects.academy-faculty.repl.co/api/employees"
  );
  return employeeList.data;
}
