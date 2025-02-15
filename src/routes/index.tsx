import { Outlet, Route } from "react-router-dom";
import React from "react";
import Login from "../modules/Login/screens";
import Layout from "../components/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import {
  LOGIN,
} from "./constants";

import RucScreen from "../modules/Ruc/screens";

export const routerRoutes = (
  <>
    <Route element={<Outlet />}>
      <Route path={LOGIN} element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <RucScreen />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path={PARAMETERS_PIPES}
        element={
          <ProtectedRoute>
            <Layout>
              <ManageParameters />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Route>
  </>
);
