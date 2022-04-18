import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navigation } from "./components/base/nav";
import { NoPageFound } from "./pages/pageNotFound";
import { ProtectedPage } from "./components/base/protectedPage";
import { Login } from "./pages/login";
import { Messenger } from "./pages/messenger";

export const App = () => {
  return (
    <>
      <Router>
        <Navigation />
        <div className="App">
          <Routes>
            <Route path="/" element={<ProtectedPage />}>
              <Route path="/" element={<Messenger />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NoPageFound />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};
