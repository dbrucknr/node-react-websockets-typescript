import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navigation } from "./components/base/nav";
import { Login } from "./pages/login";

export const App = () => {
  return (
    <>
      <Navigation />
      <div className="App">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};
