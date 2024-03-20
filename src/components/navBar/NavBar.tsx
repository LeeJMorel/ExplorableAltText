import { NavLink } from "react-router-dom";
import { Button } from "@ariakit/react";

const NavBar = () => {
  return (
    <header>
      <nav className="navContainer">
        <NavLink to="/" className="navLink">
          <Button className="navButton">Home</Button>
        </NavLink>
        <NavLink to="/team" className="navLink">
          <Button className="navButton">Team</Button>
        </NavLink>
        <NavLink to="/projects" className="navLink">
          <Button className="navButton">Projects</Button>
        </NavLink>
      </nav>
    </header>
  );
};

export default NavBar;
