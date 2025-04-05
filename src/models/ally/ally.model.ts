export interface Ally {
  id: string;
  name: string;
  description: string;
  logo: string;
  contactDetail: string;
  disabled: boolean;
  franchises: AllyFranchise[];
}

export interface AllyFranchise {
  id: string;
  name: string;
  schoolId: string;
  schoolName: string;
}
