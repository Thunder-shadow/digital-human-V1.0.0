import { NextResponse } from 'next/server';  
import type { NextRequest } from 'next/server'; 

export function middleware(request: NextRequest) {  
  const { pathname } = request.nextUrl;

  // 排除静态文件（js、css、图片等）
  if (pathname.endsWith('.js') || 
      pathname.endsWith('.css') ||
      pathname.endsWith('.png') ||
      pathname.endsWith('.jpg') ||
      pathname.endsWith('.ico')) {
    return NextResponse.next();
  }
  
// 检查是否访问 sentio 路由  
  if (pathname.startsWith('/sentio')) {  
    // 检查认证状态  
    const token = request.cookies.get('auth-token')?.value;  

    console.log('Middleware check:', {  
      path: request.nextUrl.pathname,  
      hasToken: !!token,  
    });
      
    if (!token) {  
      // 未登录，重定向到登录页面  
      return NextResponse.redirect(new URL('/login', request.url));  
    }  
  }  
    
  return NextResponse.next();  
}  
  
export const config = {  
  matcher: ['/sentio/:path*']  
};