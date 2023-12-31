import { NavLink } from "react-router-dom";
import "./Navigation.scss";
type Props = {};

const Navigation = (props: Props) => {
  return (
    <nav className="navigation">
      <NavLink to="/home"> home </NavLink>
      <>/</>
      <NavLink to="/todo"> todo </NavLink>
      <>/</>
      <NavLink to="/about"> about </NavLink>
    </nav>
  );
};

export default Navigation;
