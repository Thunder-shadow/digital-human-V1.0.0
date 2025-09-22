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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 全屏背景图片 */}
      <div className="absolute inset-0 z-0">
        <img   
          src="http://101.126.22.101:9000/digital-human/image-resources/login_img.png"  
          alt="登录界面背景"  
          className="w-full h-full object-cover"
        />
        {/* 可选：添加半透明遮罩增强文字可读性 */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* 登录表单容器 - 确保在背景之上 */}
      <div className="max-w-md w-full space-y-8 z-10 px-4 sm:px-6 lg:px-8">      
        <div className="text-center">    
          {/* 如果需要保留品牌标识，可以在这里添加 */}
        </div>  
        <AuthManager />    
      </div>    
    </div>  
  );  
}