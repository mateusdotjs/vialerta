import LoginOutlet from "./components/login/LoginOutlet";
import Main from "./components/landingPage/LandingPage";
import Register from "./components/login/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import { AuthContext } from "./contexts/AuthContext";
import ProtectedRoute from "./components/global/ProtectedRoute";
import Status from "./components/status/Status";
import TotalOcorrencias from "./components/status/TotalOcorrencias";
import ReportOcorrencia from "./components/status/ReportOcorrencia";
import Header from "./components/global/Header";
import Footer from "./components/global/Footer";

function App() {
  return (
    <BrowserRouter>
      <AuthContext>
        <Header />
        <main className="min-h-screen flex">
          <Routes>
            <Route index element={<Main />} />
            <Route path="/login" element={<LoginOutlet />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/status/:id"
              element={
                <ProtectedRoute>
                  <Status />
                </ProtectedRoute>
              }
            >
              <Route index element={<ReportOcorrencia />} />
              <Route path="stats" element={<TotalOcorrencias />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </AuthContext>
    </BrowserRouter>
  );
}

export default App;
