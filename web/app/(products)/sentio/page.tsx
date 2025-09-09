'use client'  
  
import { useAuth } from '@/hooks/useAuth';  
import { Spinner } from '@heroui/react';  
import App from "./app";  
  
export default function Page(): JSX.Element | null {  
  const { isAuthenticated, isLoading } = useAuth();  
    
  if (isLoading) {  
    return (  
      <div className="min-h-screen flex items-center justify-center">  
        <Spinner size="lg" />  
      </div>  
    );  
  }  
    
  if (!isAuthenticated) {  
    return null;  
  }  
    
  return <App />;  
}