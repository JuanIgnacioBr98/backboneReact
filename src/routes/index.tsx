import { Outlet, Route } from "react-router-dom";
import React from "react";
import Layout from "../components/Layout";
import CendeuScreen from '../modules/CendeuExample/screens/index';


export const routerRoutes = (
  <>
    <Route element={<Outlet />}>
      <Route
        path="/"
        element={
          <Layout>
            <CendeuScreen />
          </Layout>
        }
      />

    </Route>
  </>
);
