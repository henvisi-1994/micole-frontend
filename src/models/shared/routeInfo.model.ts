import { ChildrenItem } from "./childrenItem.model";
export interface RouteInfo {
  path: string[];
  title: string;
  type: string;
  fav?: boolean;
  icontype: string;
  collapse?: string;
  children?: ChildrenItem[];
}
