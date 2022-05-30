import { Link } from "react-router-dom";
import { currentDate } from "../utils/currentDate";

export function Header(): JSX.Element {
  return (
    <header>
      <h1>
        <em>CorpSquad Consultancy</em>
      </h1>
      <h1>Dashboard</h1>
      <p>{currentDate()}</p>
      <Link className="homeButton" to={"/"}>
        Home
      </Link>
    </header>
  );
}
