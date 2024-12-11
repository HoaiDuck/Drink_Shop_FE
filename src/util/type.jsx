import { ROLES } from "./enums";

export type Roles = keyof typeof ROLES;

export type Sidebar = {
  LABEL: string;
  ICON: string;
  ROUTES: string;
  ROLE: Roles;
  CHILDREN?: Sidebar[];
  IS_SHOW_MENU?: boolean;
};

export type ResponseData<T> = {
  data: T[];
  statusCode: number;
  success: string;
  metaData: {
    limit: number;
    page: number;
    total: number;
    sortBy: string;
  };
};

export type ResponseDetailData<T> = {
  data: T;
  statusCode: number;
  success: string;
};

export type TypeFile = "FILE" | "FOLDER";
