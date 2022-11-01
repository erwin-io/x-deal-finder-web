export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  isParent:boolean;
  children?: NavItem[];
}
