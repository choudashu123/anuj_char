import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Menu from "./components/Menu/Menu";
import Background from "./components/Background/Background";

import Home from "./pages/Home/Home";
import Work from "./pages/Work/Work";
import Project from "./pages/Project/Project";
import About from "./pages/About/About";
import Gallery from "./pages/Gallery/Gallery";
import Contact from "./pages/Contact/Contact";
import Events from "./pages/Events/Events";
import Event from "./pages/Event/Event";

import { AnimatePresence } from "framer-motion";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1400);
  }, [pathname]);

  return null;
}

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Background />
      <Menu />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/work" element={<Work />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<Event />} />
          <Route path="/sample-project" element={<Project />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
