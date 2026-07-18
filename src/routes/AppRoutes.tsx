import { Routes, Route, Navigate } from "react-router-dom";

import { AppLayout } from "../components/layout";

import { LoginPage } from "../pages/Login/LoginPage";
import { RegisterPage } from "../pages/Register/RegisterPage";

import { DashboardPage } from "../pages/Dashboard/DashboardPage";
import { AIChatPage } from "../pages/AIChat/AIChatPage";
import { NavigationPage } from "../pages/Navigation/NavigationPage";
import { QueuePage } from "../pages/Queue/QueuePage";
import { CrowdPage } from "../pages/Crowd/CrowdPage";
import { EmergencyPage } from "../pages/Emergency/EmergencyPage";
import { TransportPage } from "../pages/Transport/TransportPage";
import { OperationsPage } from "../pages/Admin/OperationsPage";
import { ProfilePage } from "../pages/Profile/ProfilePage";
import { SettingsPage } from "../pages/Settings/SettingsPage";
import { NotFoundPage } from "../pages/NotFound/NotFoundPage";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import Unauthorized from "../pages/Unauthorized";

export function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Dashboard */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            allowedRoles={[
              "ROLE_ADMIN",
              "ROLE_OPERATOR",
              "ROLE_VISITOR",
            ]}
          >
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* AI Chat */}

      <Route
        path="/chat"
        element={
          <ProtectedRoute
            allowedRoles={[
              "ROLE_ADMIN",
              "ROLE_OPERATOR",
              "ROLE_VISITOR",
            ]}
          >
            <AppLayout>
              <AIChatPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Navigation */}

      <Route
        path="/navigation"
        element={
          <ProtectedRoute
            allowedRoles={[
              "ROLE_ADMIN",
              "ROLE_OPERATOR",
              "ROLE_VISITOR",
            ]}
          >
            <AppLayout>
              <NavigationPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Queue */}

      <Route
        path="/queue"
        element={
          <ProtectedRoute
            allowedRoles={[
              "ROLE_ADMIN",
              "ROLE_OPERATOR",
              "ROLE_VISITOR",
            ]}
          >
            <AppLayout>
              <QueuePage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Crowd */}

      <Route
        path="/crowd"
        element={
          <ProtectedRoute
            allowedRoles={[
              "ROLE_ADMIN",
              "ROLE_OPERATOR",
            ]}
          >
            <AppLayout>
              <CrowdPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Emergency */}

      <Route
        path="/emergency"
        element={
          <ProtectedRoute
            allowedRoles={[
              "ROLE_ADMIN",
              "ROLE_OPERATOR",
            ]}
          >
            <AppLayout>
              <EmergencyPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Transport */}

      <Route
        path="/transport"
        element={
          <ProtectedRoute
            allowedRoles={[
              "ROLE_ADMIN",
              "ROLE_OPERATOR",
              "ROLE_VISITOR",
            ]}
          >
            <AppLayout>
              <TransportPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Operations */}

      <Route
        path="/operations"
        element={
          <ProtectedRoute
            allowedRoles={[
              "ROLE_ADMIN",
              "ROLE_OPERATOR",
            ]}
          >
            <AppLayout>
              <OperationsPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Profile */}

      <Route
        path="/profile"
        element={
          <ProtectedRoute
            allowedRoles={[
              "ROLE_ADMIN",
              "ROLE_OPERATOR",
              "ROLE_VISITOR",
            ]}
          >
            <AppLayout>
              <ProfilePage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Settings */}

      <Route
        path="/settings"
        element={
          <ProtectedRoute
            allowedRoles={[
              "ROLE_ADMIN",
              "ROLE_OPERATOR",
              "ROLE_VISITOR",
            ]}
          >
            <AppLayout>
              <SettingsPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />

      <Route
        path="*"
        element={<NotFoundPage />}
      />

    </Routes>
  );
}
