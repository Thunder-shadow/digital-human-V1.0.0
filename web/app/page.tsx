// 'use client'

// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'

// // 直接跳转页面
// export default function Page()
// {
//   const router = useRouter();
//   useEffect(() => {
//     router.push('/sentio');    
//   })

//   return;
// }

'use client'  
  
import { useEffect } from 'react'  
import { useRouter } from 'next/navigation'  
  
export default function Page(): null {  
  const router = useRouter();  
    
  useEffect(() => {  
    const token = localStorage.getItem('token');  
      
    if (token) {  
      router.push('/sentio');  
    } else {  
      router.push('/login');  
    }  
  }, [router]);  
  
  return null;  
}