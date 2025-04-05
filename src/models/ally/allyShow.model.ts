export interface AllyShow {
  id: string;
  name: string;
  description: string;
  logo: string;
  contactDetail: string;
  disabled: boolean;
  categoryName: string;
  franchises: AllyShowFranchises[];
}

export interface AllyShowFranchises {
  id: string;
  name: string;
  schoolId: string;
  schoolName: string;
}
