"use client";  
  
import React, { useState } from 'react';  
import { useDisclosure } from "@heroui/react";  
import { useTranslations } from 'next-intl';  
import { useAuth } from '@/hooks/useAuth';  
import LoginModal from './LoginModal';  
import RegisterModal from './RegisterModal';  
  
export default function AuthManager(): JSX.Element {  
  const t = useTranslations('Login');  
  const { login } = useAuth();  
  const [currentModal, setCurrentModal] = useState<'login' | 'register'>('login');  
  const { isOpen, onOpen, onOpenChange } = useDisclosure();  
  
  // 自动打开登录模态框  
  React.useEffect(() => {  
    onOpen();  
  }, [onOpen]);  
  
  const switchModal = (type: 'login' | 'register') => {  
    setCurrentModal(type);  
  };  
  
  const handleLoginSuccess = (token: string) => {  
    login(token);  
    onOpenChange();  
  };  
  
  return (  
    <>  
      <LoginModal  
        isOpen={isOpen && currentModal === 'login'}  
        onOpenChange={onOpenChange}  
        onSwitchToRegister={() => switchModal('register')}  
        onLoginSuccess={handleLoginSuccess}  
      />  
  
      <RegisterModal  
        isOpen={isOpen && currentModal === 'register'}  
        onOpenChange={onOpenChange}  
        onSwitchToLogin={() => switchModal('login')}  
      />  
    </>  
  );  
}