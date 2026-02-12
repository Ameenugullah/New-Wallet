import { FaWallet, FaChartPie, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li>
          <Link to="/"><FaWallet /> Dashboard</Link>
        </li>
        <li>
          <Link to="/analytics"><FaChartPie /> Analytics</Link>
        </li>
        <li>
          <Link to="/settings"><FaCog /> Settings</Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;