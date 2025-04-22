
export class UserViewModel {
  Email: string;
  FullName: string;
  ID: number;
  PhoneNumber: string;
  UserName: string;
  constructor(
    email?: string,
    fullName?: string,
    id?: number,
    phoneNumber?: string,
    userName?: string,
  ) {
    this.Email = email || '';
    this.FullName = fullName || '';
    this.ID = id || 0;
    this.PhoneNumber = phoneNumber || '';
    this.UserName = userName || '';
  }
   
}
