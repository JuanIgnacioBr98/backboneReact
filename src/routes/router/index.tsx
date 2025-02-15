import React from "react";
import { Flex } from "@mantine/core";
import { BrowserRouter, Routes } from "react-router-dom";
import { routerRoutes } from "..";
import { AuthProvider } from "../../contexts/AuthContext";
import { useDependency } from "../../hooks/useDependency";
import { ILoginRepository } from "../../modules/Login/core/Repositories/iLoginRepository";

const Router = () => {
  const loginRepository: ILoginRepository = useDependency("loginRepository");
  return (
    <Flex>
      <BrowserRouter basename="/">
        <AuthProvider loginRepository={loginRepository}>
          <Routes>{routerRoutes}</Routes>
        </AuthProvider>
      </BrowserRouter>
    </Flex>
  );
};

export default Router;
