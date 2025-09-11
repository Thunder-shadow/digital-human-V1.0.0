'use client'  
  
import { useState, useEffect } from 'react';  
import { useRouter } from 'next/navigation';  
  
export function useAuth() {  
  const [isAuthenticated, setIsAuthenticated] = useState(false);  
  const [isLoading, setIsLoading] = useState(true);  
  const router = useRouter();  
  
  useEffect(() => {  
    checkAuthStatus();  
  }, []);  
  
  const checkAuthStatus = () => {  
    const token = localStorage.getItem('token');  
    setIsAuthenticated(!!token);  
    setIsLoading(false);  
  };  
  
  const login = (token: string) => {  
    localStorage.setItem('token', token);  
    document.cookie = `auth-token=${token}; path=/; max-age=86400`;
    setIsAuthenticated(true);  
    router.push('/sentio');  
  };  
  
  const logout = () => {  
    localStorage.removeItem('token');  
    setIsAuthenticated(false);  
    router.push('/login');  
  };  
  
  return {  
    isAuthenticated,  
    isLoading,  
    login,  
    logout,  
    checkAuthStatus  
  };  
}