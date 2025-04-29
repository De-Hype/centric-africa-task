import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/auth/SignUpPage";
import SignInPage from "./pages/auth/SignInPage";
import NotFoundPage from "./pages/NotFoundPage";
import Dashboard from "./pages/task/Dashboard";
import AvailableTasks from "./pages/task/AvailableTasks";
import MyTasks from "./pages/task/MyTasks";
import CreateTask from "./pages/task/CreateTask";
import "./App.css";
import Layout from "./components/layout/Layout";
import { Toaster } from "react-hot-toast";
import GuestRoute from "./pages/GuestRoute";
import ProtectedRoute from "./pages/ProtectedRoute";


function App() {
  return (
    <Router>
      <div className="helvetica-neue">
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          {/* Auth-only routes (no access if already logged in) */}
          <Route element={<GuestRoute />}>
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
          </Route>

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/available-tasks" element={<AvailableTasks />} />
              <Route path="/my-tasks" element={<MyTasks />} />
              <Route path="/create-task" element={<CreateTask />} />
            </Route>
          </Route>

          {/* 404 Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
