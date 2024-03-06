import "./App.css";
import React, { useState } from "react";
import News from "./components/News";
import NavBar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

function App() {
  const [progress, setProgress] = useState(0);
  const pageSize = 5;
  return (
    <Router>
      <NavBar />
      <LoadingBar height={3} color="#f11946" progress={progress} />
      <Routes>
        <Route
          exact
          path="/"
          element={<News category="general" setProgress={setProgress} />}
        />
        <Route
          exact
          path="/business"
          element={<News category="business" setProgress={setProgress} />}
        />
        <Route
          exact
          path="/entertainment"
          element={<News category="entertainment" setProgress={setProgress} />}
        />
        <Route
          exact
          path="/general"
          element={<News category="general" setProgress={setProgress} />}
        />
        <Route
          exact
          path="/health"
          element={<News category="health" setProgress={setProgress} />}
        />
        <Route
          exact
          path="/science"
          element={<News category="science" setProgress={setProgress} />}
        />
        <Route
          exact
          path="/sports"
          element={<News category="sports" setProgress={setProgress} />}
        />
        <Route
          exact
          path="/technology"
          element={<News category="technology" setProgress={setProgress} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
