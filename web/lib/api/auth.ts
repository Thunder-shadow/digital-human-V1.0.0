import { post } from './requests';  
  
export interface LoginRequest {  
  username: string;  
  password: string;  
}  
  
export interface RegisterRequest {  
  username: string;  
  password: string;  
  mobile: string;  
  email: string;  
}  
  
export const authApi = {    
  login: (data: LoginRequest) => post('/adh/auth/login', data),    
  register: (data: RegisterRequest) => post('/adh/auth/register', data),    
  sendCode: (mobile: string) => post('/adh/auth/send-code', { mobile }),    
  logout: () => post('/adh/auth/logout'),    
  refreshToken: () => post('/adh/auth/refresh')    
};