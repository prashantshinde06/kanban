import React, { lazy, Suspense } from "react";
import Spinner from "@/components/spinner";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PersistentLayout from "./persistentLayout";
import ProtectedRoute from "./protectedRoute";
import {
  rootPath,
  dashboardPath,
  employeePath,
  employeeOnboardingPath,
  kanbanPath,
} from "./routePaths";

const Dashboard = lazy(() => import("@/pages/dashboard"));
const Employee = lazy(() => import("@/pages/employee"));
const EmployeeOnboarding = lazy(() => import("@/components/employee-onboarding"));
const Kanban = lazy(() => import("@/pages/kanban"));
const RouteNotFound = lazy(() => import("@/pages/page-not-found-404"));

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <Spinner size="w-12 h-12" colorClass="text-blue-600" />
          </div>
        }
      >
        <Routes>
          {/* Default landing */}
          <Route index element={<Navigate to={kanbanPath} replace />} />
          <Route path="login" element={<Navigate to={kanbanPath} replace />} />

          {/* Protected Routes - Auth check happens first */}
          <Route element={<ProtectedRoute />}>
            <Route path={rootPath} element={<PersistentLayout />}>
              <Route index element={<Navigate to={kanbanPath} replace />} />
              {/* Dashboard */}
              <Route path={dashboardPath} element={<Dashboard />} />

              {/* Employee */}
              <Route path={employeePath} element={<Employee />} />

              {/* Employee Onboarding */}
              <Route path={employeeOnboardingPath} element={<EmployeeOnboarding />} />

              {/* Kanban */}
              <Route path={kanbanPath} element={<Kanban />} />
            </Route>
          </Route>

          <Route path="*" element={<RouteNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AllRoutes;
