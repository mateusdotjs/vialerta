import LoginOutlet from "./pages/LoginOutlet";
import Main from "./pages/Main";
import Register from "./pages/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { AuthContext } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Status from "./pages/Status";

function App() {
  return (
    <BrowserRouter>
      <AuthContext>
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
          />
        </Routes>
      </AuthContext>
    </BrowserRouter>
  );
}

export default App;
