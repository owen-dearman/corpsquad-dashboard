import { useEffect, useReducer } from "react";
import { Header } from "./components/Header";
import { MainDashboard } from "./components/main-dashboard/MainDashboard";
import { fullProjectInterface } from "./utils/interfaces";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { addClientsAndEmployeesToProjects } from "./utils/addClientsAndEmployeesToProjects";
import { EmployeeDashboard } from "./components/EmployeeDashboard";
import { ClientDashboard } from "./components/ClientDashboard";

function App(): JSX.Element {
  type State = {
    data: fullProjectInterface[];
    isLoading: boolean;
    filters?: {
      projectSize: { min: null; max: null };
      clients: [];
      employees: [];
      timeFrame: { start: null; end: null };
      employeeNumber: { min: null; max: null };
    };
  };

  type Action =
    | { type: "request" }
    | { type: "success"; results: fullProjectInterface[] };

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
          data: action.results,
        };
    }
  };

  const [{ data, isLoading }, dispatch] = useReducer(projectDataReducer, {
    data: [],
    isLoading: false,
  });

  //const [projectData, setProjectData] = useState<fullProjectInterface[]>([]);

  useEffect(() => {
    function fetchProjects() {
      dispatch({ type: "request" });
      axios
        .get("https://consulting-projects.academy-faculty.repl.co/api/projects")
        .then((results) => addClientsAndEmployeesToProjects(results.data))
        .then((projectData) =>
          dispatch({ type: "success", results: projectData })
        );
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
            <Route path="/" element={<MainDashboard projectData={data} />} />
            <Route
              path="/employees/:employeeId"
              element={<EmployeeDashboard projectData={data} />}
            />
            <Route
              path="/clients/:clientId"
              element={<ClientDashboard projectData={data} />}
            />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;
