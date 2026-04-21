import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/activities">Activities</Link>
        </li>
        <li>
          <Link to="/filter">Filter</Link>
        </li>
        <li>
          <Link to="/stats">Stats</Link>
        </li>
      </ul>
    </nav>
  );
}
