import { Route, Routes } from "react-router-dom";
import styles from "./App.module.scss";
import classNames from "classnames";
import Home from "./pages/Home";
import Footer from "./components/footer/Footer";
import NavBar from "./components/navBar/NavBar";
import HomeDetail from "./pages/HomeDetail";
import HomeMain from "./pages/HomeMain";
import Project from "./pages/Project";

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
          <Route path="/project" element={<Project />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
