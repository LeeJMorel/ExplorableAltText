import { Outlet } from "react-router-dom";
import styles from "./Pages.module.scss";

function Home() {
  return (
    <div className={styles.page}>
      {/* Outlet to render child routes */}
      <Outlet />
    </div>
  );
}

export default Home;
