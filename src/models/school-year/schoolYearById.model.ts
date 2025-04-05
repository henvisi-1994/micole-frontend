export interface SchoolYearById {
  id: string;
  startYear: number;
  startMonth: string;
  endYear: number;
  endMonth: string;
  schoolDay: string;
  normalizedStartMonth: string;
  normalizedEndMonth: string;
  normalizedSchoolDay: string;
  franchiseId: string;
  franchiseName: string
  schoolId: string;
  close: boolean;
}
