import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/client/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminGarbage from "./pages/admin/garbage/AdminGarbage";
import UserGarbageRequest from "./pages/client/garbage/UserGarbageRequest";
import UserDashboard from "./pages/client/dashboard/UserDashboard";
import UserTransaction from "./pages/client/transaction/UserTransaction";
import AdminTransactions from "./pages/admin/transactions/AdminTransactions";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* User routes */}
          <Route path="/" exact Component={Home} />
          <Route exact path="/login" Component={Login} />
          <Route exact path="/register" Component={Register} />
          <Route exact path="/user/dashboard" Component={UserDashboard} />
          <Route exact path="/user/my-garbage" Component={UserGarbageRequest} />
          <Route
            exact
            path="/user/my-transaction"
            Component={UserTransaction}
          />

          {/* Admin routes */}
          <Route exact path="/admin/dashboard" Component={AdminDashboard} />
          <Route exact path="/admin/garbage" Component={AdminGarbage} />
          <Route
            exact
            path="/admin/transactions"
            Component={AdminTransactions}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
