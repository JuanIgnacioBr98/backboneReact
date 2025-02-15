import React from "react";
import { AppShell, Flex } from "@mantine/core";
import Header from "../Header";

const Layout = ({ children, showHeader = true }) => {

  return (
    <AppShell
    padding="md">
      {showHeader && (
        <AppShell.Header>
          <Header />
        </AppShell.Header>
      )}
      <AppShell.Main>
        <Flex direction={"column"} w={"100%"} h={showHeader ? "70vh" : "100vh"} pos={"absolute"} bottom={0} right={0}>
          {children}
        </Flex>
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
