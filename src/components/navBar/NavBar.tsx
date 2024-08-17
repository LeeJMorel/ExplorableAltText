import { NavLink } from "react-router-dom";
import { Button } from "@ariakit/react";
import styles from "./NavBar.module.scss";

const NavBar = () => {
  return (
    <header>
      <nav className={styles.navContainer}>
        <NavLink to="/" className={styles.navLink}>
          <Button className={styles.navButton}>Home</Button>
        </NavLink>
        <NavLink to="/projects" className={styles.navLink}>
          <Button className={styles.navButton}>Projects</Button>
        </NavLink>
      </nav>
    </header>
  );
};

export default NavBar;
