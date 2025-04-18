import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";
import JobPage from "./pages/Job";
import ListsPage from "./pages/List";
import MonetizationPage from "./pages/Monetize";
import PurchasesPage from "./pages/Purchase";
import CommunitiesPage from "./pages/Communities";
import SpacePage from "./pages/Space";
import Search from "./pages/Search";
import Miamour from "./pages/Miamour";
import Verification from "./pages/Verification";
import LandingPage from "./pages/LandingPage";
import Messages from "./pages/Messages";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("authUser is here:", data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center bg-black">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-black to-purple-900">
      {authUser && <Sidebar />}
      <div className="flex-1 overflow-y-auto">
        <Routes>
          {/* Default route is now the LandingPage */}
          <Route path="/" element={<HomePage />} />
          <Route path="/landing" element={<LandingPage />} />
          
          {/* Protected routes for authenticated users */}
          <Route
            path="/home"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/transaction-history"
            element={authUser ? <NotificationPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/messages"
            element={authUser ? <Messages /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/:username"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/jobs"
            element={authUser ? <JobPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/lists"
            element={authUser ? <ListsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/monetization"
            element={authUser ? <MonetizationPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/purchases"
            element={authUser ? <PurchasesPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/communities"
            element={authUser ? <CommunitiesPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/space"
            element={authUser ? <SpacePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/search"
            element={authUser ? <Search /> : <Navigate to="/login" />}
          />
          <Route
            path="/miamour"
            element={authUser ? <Miamour /> : <Navigate to="/login" />}
          />
          <Route
            path="/verification"
            element={authUser ? <Verification /> : <Navigate to="/login" />}
          />

          {/* Public routes for unauthenticated users */}
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/home" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/verification" />}
          />
          <Route
            path="/forgot-password"
            element={!authUser ? <ForgotPasswordPage /> : <Navigate to="/home" />}
          />
        </Routes>
      </div>
      {authUser && <RightPanel />}
      <Toaster />
    </div>
  );
}

export default App;