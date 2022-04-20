import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import { Navigation, ProtectedPage } from "./components/index";
import { Login, Registration, Messenger, NoPageFound } from "./pages/index";

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
