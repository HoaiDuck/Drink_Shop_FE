import { ROLES } from "./enums";
import { Roles, Sidebar } from "./type";

export const ROUTES = {
  PRIVATE: {
    LOGIN: {
      INDEX: "login",
    },
  },
  PROTECTED: {
    HOME: {
      INDEX: "",
    },
    DASHBOARD: {
      INDEX: "dashboard",
    },
    FILE_DRIVER: {
      INDEX: "file-driver",
      DRIVER: "",
      UPLOAD: "upload",
    },
    PRODUCTS: {
      INDEX: "products",
      LIST: "list",
    },
  },
  PUBLIC: {
    PAGE_NOT_FOUND: {
      INDEX: "*",
    },
  },
};

// export const SIDE_BAR: Sidebar[] = [
//   {
//     LABEL: "Home",
//     ICON: "",
//     ROLE: ROLES.USER as Roles,
//     ROUTES: ROUTES.PROTECTED.HOME.INDEX,
//   },
//   {
//     LABEL: "File driver",
//     ICON: "",
//     ROLE: ROLES.USER as Roles,
//     ROUTES: ROUTES.PROTECTED.FILE_DRIVER.INDEX,
//     CHILDREN: [
//       {
//         LABEL: "Driver",
//         ICON: "",
//         ROLE: ROLES.USER as Roles,
//         ROUTES: ROUTES.PROTECTED.FILE_DRIVER.DRIVER,
//       },
//       {
//         LABEL: "Upload",
//         ICON: "",
//         ROLE: ROLES.ADMIN as Roles,
//         ROUTES: ROUTES.PROTECTED.FILE_DRIVER.UPLOAD,
//       },
//     ],
//   },
//   {
//     LABEL: "Products",
//     ICON: "",
//     ROLE: ROLES.USER as Roles,
//     ROUTES: ROUTES.PROTECTED.PRODUCTS.INDEX,
//     CHILDREN: [
//       {
//         LABEL: "List",
//         ICON: "",
//         ROLE: ROLES.USER as Roles,
//         ROUTES: ROUTES.PROTECTED.PRODUCTS.LIST,
//       },
//     ],
//   },

//   {
//     LABEL: "Dashboard",
//     ICON: "",
//     ROLE: ROLES.ADMIN as Roles,
//     ROUTES: ROUTES.PROTECTED.DASHBOARD.INDEX,
//   },
// ];
