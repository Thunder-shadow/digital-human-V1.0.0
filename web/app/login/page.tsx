'use client'  
  
import { useEffect } from 'react';  
import { useRouter } from 'next/navigation';  
import AuthManager from '@/components/AuthManager';  
  
export default function LoginPage(): JSX.Element {  
  const router = useRouter();  
    
  useEffect(() => {  
    const token = localStorage.getItem('token');  
    if (token) {  
      router.push('/sentio');  
    }  
  }, [router]);  
  
  return (  
    <div className="min-h-screen flex items-center justify-center bg-gray-50">  
      <div className="max-w-md w-full space-y-8">  
        <div className="text-center">  
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">  
            欢迎使用数字人交互系统  
          </h2>  
          <p className="mt-2 text-sm text-gray-600">  
            请登录以继续使用  
          </p>  
        </div>  
        <AuthManager />  
      </div>  
    </div>  
  );  
}