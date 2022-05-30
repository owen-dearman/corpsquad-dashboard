import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { MainDashboard } from "./components/main-dashboard/MainDashboard";
import { fullProjectInterface, projectInterface } from "./utils/interfaces";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { addClientsAndEmployeesToProjects } from "./utils/addClientsAndEmployeesToProjects";
import { EmployeeDashboard } from "./components/main-dashboard/EmployeeDashboard";

function App(): JSX.Element {
  const [projectData, setProjectData] = useState<fullProjectInterface[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      const projects = await axios.get(
        "https://consulting-projects.academy-faculty.repl.co/api/projects"
      );
      const projectData: projectInterface[] = projects.data;
      const fullProjectInformation: fullProjectInterface[] =
        await addClientsAndEmployeesToProjects(projectData);
      setProjectData(fullProjectInformation);
    }
    fetchProjects();
  }, []);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainDashboard data={projectData} />} />
          <Route
            path="/employees/:employeeId"
            element={<EmployeeDashboard projectData={projectData} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
