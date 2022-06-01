import { useEffect, useReducer } from "react";
import { Header } from "./components/Header";
import {
  MainDashboard,
  SortTypes,
} from "./components/main-dashboard/MainDashboard";
import {
  fullClientInterface,
  fullEmployeeInterface,
  fullProjectInterface,
} from "./utils/interfaces";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { addClientsAndEmployeesToProjects } from "./utils/addClientsAndEmployeesToProjects";
import { EmployeeDashboard } from "./components/EmployeeDashboard";
import { ClientDashboard } from "./components/ClientDashboard";
import { fetchListOfClients } from "./utils/fetchListOfClients";
import { fetchListOfEmployees } from "./utils/fetchListOfEmployees";
import { convertDateToComparable } from "./utils/convertDateToComparable";

export type State = {
  projectData: fullProjectInterface[];
  activeSort: SortTypes;
  clientList: fullClientInterface[];
  employeeList: fullEmployeeInterface[];
  isLoading: boolean;
  filters: {
    projectSize: { min: null | string; max: null | string };
    client: string | null;
    employees: string[];
    timeFrame: {
      startBefore: null | string;
      startAfter: null | string;
      endBefore: null | string;
      endAfter: null | string;
    };
  };
};

export type Action =
  | { type: "request" }
  | {
      type: "success";
      projects: fullProjectInterface[];
      clients: fullClientInterface[];
      employees: fullEmployeeInterface[];
    }
  | { type: "set-filters"; results: State["filters"] }
  | { type: "sort-projects"; data: fullProjectInterface[]; sort: SortTypes };

const projectDataReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "request":
      return {
        ...state,
        isLoading: true,
      };
    case "success":
      return {
        ...state,
        isLoading: false,
        projectData: action.projects,
        clientList: action.clients,
        employeeList: action.employees,
      };
    case "set-filters":
      return {
        ...state,
        isLoading: false,
        filters: action.results,
      };
    case "sort-projects":
      return {
        ...state,
        isLoading: false,
        projectData: action.data,
        activeSort: action.sort,
      };
  }
};

function App(): JSX.Element {
  const [
    { projectData, clientList, employeeList, isLoading, filters, activeSort },
    dispatch,
  ] = useReducer(projectDataReducer, {
    projectData: [],
    clientList: [],
    employeeList: [],
    activeSort: "endDateDescending",
    filters: {
      projectSize: { min: null, max: null },
      client: null,
      employees: [],
      timeFrame: {
        startBefore: null,
        startAfter: null,
        endBefore: null,
        endAfter: null,
      },
    },
    isLoading: false,
  });

  //const [projectData, setProjectData] = useState<fullProjectInterface[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      dispatch({ type: "request" });
      const projects = await axios.get(
        "https://consulting-projects.academy-faculty.repl.co/api/projects"
      );
      const clients = await fetchListOfClients();
      const employees = await fetchListOfEmployees();
      const fullProjectList = addClientsAndEmployeesToProjects(
        projects.data,
        clients,
        employees
      );
      dispatch({
        type: "success",
        projects: fullProjectList.sort(
          (a, b) =>
            parseInt(convertDateToComparable(b.contract.endDate)) -
            parseInt(convertDateToComparable(a.contract.endDate))
        ),
        clients: clients,
        employees: employees,
      });
    }
    fetchProjects();
  }, []);

  return (
    <>
      <Router>
        <Header />
        {isLoading ? (
          <h1 className="loadingMessage">Loading...</h1>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <MainDashboard
                  projectData={projectData}
                  clientList={clientList}
                  employeeList={employeeList}
                  dispatch={dispatch}
                  filters={filters}
                  activeSort={activeSort}
                />
              }
            />
            <Route
              path="/employees/:employeeId"
              element={<EmployeeDashboard projectData={projectData} />}
            />
            <Route
              path="/clients/:clientId"
              element={
                <ClientDashboard
                  projectData={projectData}
                  employeeList={employeeList}
                />
              }
            />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;
