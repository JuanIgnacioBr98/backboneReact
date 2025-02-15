import { Flex, Grid, Image } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { adminNavbarItems, navbarItems } from "./navbarItems";
import CustomNavLink from "../../components/CustomNavLink";
import { customColors } from "../../themes/customColors";
import LogoLight from "../../assets/images/logoLight.svg";
import { AuthContext } from "../../contexts/AuthContext";
import { ROLES } from "../../constants";

const VerticalNavbar = () => {
  const location = useLocation().pathname;
  const [itemActive, setItemActive] = useState(location);
  const authContext = useContext(AuthContext);
  const userRole = authContext?.role;

  const returnItem = (item: any) => <CustomNavLink key={item.name} itemActive={itemActive} item={item} />;

  useEffect(() => {
    setItemActive(location);
  }, [location]);

  return (
    <Flex
      w="100%"
      h="100vh"
      display="flex"
      direction="column"
      style={{
        backgroundColor: customColors.primary.primaryBackground,
        zIndex: 999,
        overflowY: "scroll",
      }}
    >
      <Image src={LogoLight} pl="xl" pr="xl" pb="sm" pt="md" />

      {userRole === ROLES.ADMIN
        ? adminNavbarItems.map((item: any) => returnItem(item))
        : navbarItems.map((item: any) => returnItem(item))}
    </Flex>
  );
};

export default VerticalNavbar;
