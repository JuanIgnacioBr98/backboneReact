import Home from "../../assets/images/navbarIcons/Home";
import NewSelling from "../../assets/images/navbarIcons/NewSelling";
import Liquidations from "../../assets/images/navbarIcons/Liquidations";
import Branches from "../../assets/images/navbarIcons/Branches";
import Sellers from "../../assets/images/navbarIcons/Sellers";
import BusinessData from "../../assets/images/navbarIcons/BusinessData";
import Notifications from "../../assets/images/navbarIcons/Notifications";
import Collection from "../../assets/images/navbarIcons/Collection";
import Help from "../../assets/images/navbarIcons/Help";
import Profile from "../../assets/images/navbarIcons/Profile";

export const adminNavbarItems = [
  {
    name: "Comercios",
    icon: NewSelling,
    path: "/admin-home",
    isBlock: false,
  },
];

export const navbarItems = [
  {
    name: "Inicio",
    icon: Home,
    path: "/",
    isBlock: false,
  },
  {
    name: "Nueva venta",
    icon: NewSelling,
    path: "/nueva-venta",
    isBlock: false,
  },
  {
    name: "Liquidaciones",
    icon: Liquidations,
    path: "/liquidaciones",
    isBlock: false,
  },
  {
    name: "Sucursales",
    icon: Branches,
    path: "/sucursales",
    isBlock: true,
  },
  {
    name: "Vendedores",
    icon: Sellers,
    path: "/vendedores",
    isBlock: true,
  },
  {
    name: "Datos del comercio",
    icon: BusinessData,
    path: "/datos-comercio",
    isBlock: true,
  },
  {
    name: "Notifiaciones",
    icon: Notifications,
    path: "/notificaciones",
    isBlock: true,
  },
  {
    name: "Cobranza",
    icon: Collection,
    path: "/cobranza",
    isBlock: true,
  },
  {
    name: "Ayuda",
    icon: Help,
    path: "/ayuda",
    isBlock: true,
  },
  {
    name: "Mi perfil",
    icon: Profile,
    path: "/mi-perfil",
    isBlock: true,
  },
];
