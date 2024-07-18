export interface NewUserSignupBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  accountType: string;
  approved?: string | boolean;
  contactNumber: string;
  otp: string;
}
