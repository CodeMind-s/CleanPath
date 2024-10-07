import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/client/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminGarbage from "./pages/admin/garbage/AdminGarbage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* User routes */}
          <Route path="/" exact Component={Home} />
          <Route exact path="/login" Component={Login} />
          <Route exact path="/register" Component={Register} />

          {/* Admin routes */}
          <Route exact path="/admin/dashboard" Component={AdminDashboard} />
          <Route exact path="/admin/garbage" Component={AdminGarbage} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
