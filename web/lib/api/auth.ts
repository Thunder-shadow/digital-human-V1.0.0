import { post } from './requests';  
  
export interface LoginRequest {  
  username: string;  
  password: string;  
}  
  
export interface RegisterRequest {  
  username: string;  
  password: string;  
  mobile: string;  
  verifyCode: string;  
}  
  
export const authApi = {  
  login: (data: LoginRequest) => post('/auth/login', data),  
  register: (data: RegisterRequest) => post('/auth/register', data),  
  sendCode: (mobile: string) => post('/auth/send-code', { mobile }),  
  logout: () => post('/auth/logout'),  
  refreshToken: () => post('/auth/refresh')  
};