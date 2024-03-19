import { Route, Routes } from "react-router-dom";
import styles from "./App.module.scss";
import classNames from "classnames";

import NavBar from "./components/navBar/NavBar";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Projects from "./pages/Projects";
import Footer from "./components/footer/Footer";

function determineTheme() {
  const storedTheme = localStorage.getItem("theme");
  return storedTheme || "light"; // Default to light theme if no preference is stored
}

const theme = determineTheme();

function App() {
  return (
    <div className={classNames(styles.app, styles[theme])}>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
