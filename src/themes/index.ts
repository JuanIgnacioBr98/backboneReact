import {
  Button,
  Container,
  createTheme,
  MantineColorsTuple,
  MantineThemeOverride,
  NavLink,
  PinInput,
  rem,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./components/Title/title.module.css";
import buttonClasses from "./components/Buttons/button.module.css";
import navLinkClasses from "./components/NavLink/navlink.module.css";
import pinInputClasses from "./components/PinInput/pinInputClasses.module.css";
import inputClasses from "./components/TextInput/inputClasses.module.css";

const primaryColor: MantineColorsTuple = [
  "#ebf6fe",
  "#d6e8f8",
  "#a8d0f3",
  "#78b7f0",
  "#54a1ed",
  "#4094ec",
  "#368ded",
  "#2a7ad3",
  "#206cbd",
  "#065496",
];

const CONTAINER_SIZES: Record<string, string> = {
  xxs: rem(300),
  xs: rem(400),
  sm: rem(500),
  md: rem(600),
  lg: rem(700),
  xl: rem(800),
  xxl: rem(900),
};

export const customTheme: MantineThemeOverride = createTheme({
  fontFamily: "Inter, sans-serif",
  headings: { fontFamily: "Inter, sans-serif" },
  fontSizes: {
    xs: rem(10), //12px
    sm: rem(11), //14px
    md: rem(14), //16px
    lg: rem(16), //18px
    xl: rem(20), //20px
  },
  primaryColor: "main-blue",
  colors: {
    "main-blue": primaryColor,
  },
  lineHeights: {
    xs: "1.4",
    sm: "1.45",
    md: "1.55",
    lg: "1.6",
    xl: "1.65",
  },
  components: {
    Title: Title.extend({
      classNames: {
        root: classes.heading,
      },
    }),
    TextInput: TextInput.extend({
      classNames: {
        root: inputClasses.textInput,
      },
    }),
    Text: Text.extend({
      classNames: {
        root: classes.heading,
      },
    }),
    Button: Button.extend({
      classNames: {
        root: buttonClasses.buttons,
      },
    }),
    NavLink: NavLink.extend({
      classNames: {
        root: navLinkClasses.navlink,
      },
    }),
    PinInput: PinInput.extend({
      classNames: {
        root: pinInputClasses.pinInput,
      },
    }),
    Container: Container.extend({
      vars: (_, { size, fluid }) => ({
        root: {
          "--container-size": fluid
            ? "100%"
            : size !== undefined && size in CONTAINER_SIZES
            ? CONTAINER_SIZES[size]
            : rem(size),
        },
      }),
    }),
  },
});
