import { Outlet, Route } from "react-router-dom";
import React from "react";
import Layout from "../components/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import CendeuScreen from '../modules/CendeuExample/screens/index';


export const routerRoutes = (
  <>
    <Route element={<Outlet />}>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <CendeuScreen />
            </Layout>
          </ProtectedRoute>
        }
      />

    </Route>
  </>
);
