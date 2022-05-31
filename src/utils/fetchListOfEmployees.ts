import axios from "axios";
import { fullEmployeeInterface } from "./interfaces";

export async function fetchListOfEmployees(): Promise<fullEmployeeInterface[]> {
  const employeeList = await axios.get(
    "https://consulting-projects.academy-faculty.repl.co/api/employees"
  );
  return employeeList.data;
}
