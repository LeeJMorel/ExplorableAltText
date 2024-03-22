import { Route, Routes } from "react-router-dom";
import styles from "./App.module.scss";
import classNames from "classnames";

import NavBar from "./components/navBar/NavBar";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Projects from "./pages/Projects";
import Footer from "./components/footer/Footer";
import ProjectsMain from "./pages/ProjectsMain";
import ProjectsDetail from "./pages/ProjectsDetail";
import HomeMain from "./pages/HomeMain";
import HomeDetail from "./pages/HomeDetail";

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
          <Route path="/" element={<Home />}>
            {/* Nested routes for home */}
            <Route index element={<HomeMain />} />
            <Route path="details/:faqId" element={<HomeDetail />} />
          </Route>
          {/* Nested routes for projects */}
          <Route path="/projects/*" element={<Projects />}>
            <Route index element={<ProjectsMain />} />
            <Route path=":projectId" element={<ProjectsDetail />} />
          </Route>
          <Route path="/team" element={<Team />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
