import PropTypes from "prop-types";

export const SIZES = {
  NAVIGATION_BOTTOM_TABS_HEIGHT: 80,
};

export const ROUTES = {
  A: "/",
  B: "/chat",
  C: "/post-create",
  D: "/map",
  E: "/user",
};

export const NAVIGATION_TAB_PROP_TYPE = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
  })
);

export interface TabItem {
  name: string;
  route: string;
  action: () => void;
}

export type TabsArray = TabItem[];

export const HIDDEN_TABBAR_PATHS = [
  "/detail",
  "/filter",
  "/region",
  "/room",
  "/post-create",
  "/user/profile",
  "/user/verify",
] as const;
