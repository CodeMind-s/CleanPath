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
import AdminGarbageUpdate from "./pages/admin/garbage/AdminGarbageUpdate";
import UserTransactionHistory from "./pages/client/transaction/UserTransactionHistory";
import WMADashboard from "./pages/wma/dashboard/WMADashboard";
import WMACollectors from "./pages/wma/collectors/ViewCollectors";
import WMAProfile from "./pages/wma/profile/WMAProfile";
import WMASchedules from "./pages/wma/schedule/ViewSchedules";
import WMATransaction from "./pages/wma/transaction/WMATransaction";
import AdminSchedule from "./pages/admin/schedule/AdminSchedule";
import AdminScheduleUpdate from "./pages/admin/schedule/AdminScheduleUpdate";
import AdminScheduleCreate from "./pages/admin/schedule/AdminScheduleCreateForm";
import AdminCollectors from "./pages/admin/collectors/AdmonCollectors";
import AdminUsers from "./pages/admin/user/Adminusers";

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
          <Route
            exact
            path="/wma/transactions"
            Component={WMATransaction}
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
          <Route
            exact
            path="/admin/schedules"
            Component={AdminSchedule}
          />
          <Route
            exact
            path="/admin/schedules/update"
            Component={AdminScheduleUpdate}
          />
          <Route
            exact
            path="/admin/schedules/create"
            Component={AdminScheduleCreate}
          />
          <Route
            exact
            path="/admin/collectors"
            Component={AdminCollectors}
          />
          <Route
            exact
            path="/admin/users"
            Component={AdminUsers}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
