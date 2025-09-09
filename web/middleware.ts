import { NextResponse } from 'next/server';  
import type { NextRequest } from 'next/server';  
  
export function middleware(request: NextRequest) {  
  // 检查是否访问 sentio 路由  
  if (request.nextUrl.pathname.startsWith('/sentio')) {  
    // 检查认证状态  
    const token = request.cookies.get('auth-token')?.value;  
      
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