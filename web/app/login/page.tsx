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
          <img   
            src="http://101.126.22.101:9000/digital-human/image-resources/login_img.png"  
            alt="登录界面图片"  
            className="mx-auto max-w-full h-auto"  
          />  
        </div>  
        <AuthManager />    
      </div>    
    </div>  
  );  
}