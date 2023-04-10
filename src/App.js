import "./App.css";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./Context/AuthContext";
import Feed from "./Components/Feed";
import { useContext } from "react";
import ForgotPassword from "./Components/ForgotPassword";
import Profile from "./Components/Profile";
import "./Styles/Posts.css";

function RequireAuth({ children, redirectTo }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to={redirectTo} />;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" Component={Login} />
            <Route path="/signup" Component={Signup} />
            <Route path="/profile/:id" Component={Profile} />
            <Route
              path="/"
              element={
                <RequireAuth redirectTo="/login">
                  <Feed />
                </RequireAuth>
              }
            />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
