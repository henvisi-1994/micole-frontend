export interface SchoolWithFranchises {
  name: string;
  franchises: SchoolWithFranchisesFranchise[];
}

export interface SchoolWithFranchisesFranchise {
  id: string;
  name: string;
}
