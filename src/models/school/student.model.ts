export interface StudentForCreate {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  profilePicture?: File;
  campus?: string;
  grade?: string;
  group?: string;
  schedule?: string;
}

export interface StudentForUpdate {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  profilePicture?: File;
  campus?: string;
  grade?: string;
  group?: string;
  schedule?: string;
}

export interface StudentForReturn {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  profilePicture?: string;
  campus?: string;
  grade?: string;
  group?: string;
  schedule?: string;
}

export interface EmergencyContactForCreate {
  name: string;
  relationship: string;
  phoneNumber: string;
}
