import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import { Navigation } from "./components/base/nav";
import { NoPageFound } from "./pages/pageNotFound";
import { ProtectedPage } from "./components/base/protectedPage";
import { Login } from "./pages/login";
import { Messenger } from "./pages/messenger";
import { Registration } from "./pages/registration";

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
            <Route path="/register" element={<Registration />} />
            <Route path="*" element={<NoPageFound />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};
