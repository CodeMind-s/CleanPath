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
import UserProfile from "./pages/client/profile/profile";
import AdminTransactions from "./pages/admin/transactions/AdminTransactions";
import UserSmartDeviceRequest from "./pages/client/smartDevice/UserSmartDeviceRequest";
import AdminGarbageUpdate from "./pages/admin/garbage/AdminGarbageUpdate";
import UserTransactionHistory from "./pages/client/transaction/UserTransactionHistory";
import WMADashboard from "./pages/wma/dashboard/WMADashboard";
import WMACollectors from "./pages/wma/collectors/ViewCollectors";
import WMAProfile from "./pages/wma/profile/WMAProfile";
import WMASchedules from "./pages/wma/schedule/ViewSchedules";
import WMATransaction from "./pages/wma/transaction/WMATransaction";

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
          <Route exact path="/user/profile" Component={UserProfile} />
          <Route
            exact
            path="/user/my-transaction"
            Component={UserTransaction}
          />
          <Route
            exact
            path="/user/my-transaction/history"
            Component={UserTransactionHistory}
          />

          {/* WMA Routes */}
          <Route exact path="/wma/dashboard" Component={WMADashboard} />
          <Route exact path="/wma/collectors" Component={WMACollectors} />
          <Route exact path="/wma/schedules" Component={WMASchedules} />
          <Route exact path="/wma/profile" Component={WMAProfile} />
          <Route exact path="/wma/transactions" Component={WMATransaction} />
          <Route
            exact
            path="/user/smartDevice"
            Component={UserSmartDeviceRequest}
          />

          {/* Admin routes */}
          <Route exact path="/admin/dashboard" Component={AdminDashboard} />
          <Route exact path="/admin/garbage" Component={AdminGarbage} />
          <Route
            exact
            path="/admin/garbage/update"
            Component={AdminGarbageUpdate}
          />
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
