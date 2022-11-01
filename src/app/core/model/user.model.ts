import { Gender } from "./gender.model";

export class User  {
  userId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  age: number;
  birthDate: string;
  address: string;
  mobileNumber: string;
  username: string;
  isLock: boolean;
  isAdminUserType: boolean;
  isAdminApproved: boolean;
  gender: Gender;
}
