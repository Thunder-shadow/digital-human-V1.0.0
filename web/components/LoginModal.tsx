"use client";  
  
import React, { useState } from 'react';  
import {  
  Modal,  
  ModalContent,  
  ModalHeader,  
  ModalBody,  
  ModalFooter,  
  Button,  
  Input,  
  Link,  
  Divider  
} from "@heroui/react";  
import { useTranslations } from 'next-intl';  
import { post } from '@/lib/api/requests';  
  
interface LoginModalProps {  
  isOpen: boolean;  
  onOpenChange: (open: boolean) => void;  
  onSwitchToRegister: () => void;  
  onSwitchToReset?: () => void;  
  onLoginSuccess?: (token: string) => void; // 添加这个属性  
}  
  
export default function LoginModal({   
  isOpen,   
  onOpenChange,   
  onSwitchToRegister,  
  onSwitchToReset,  
  onLoginSuccess  
}: LoginModalProps) {  
  const t = useTranslations('Login');  
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  
  const [isLoading, setIsLoading] = useState(false);  
  
  const handleLogin = async () => {  
    if (!username || !password) return;  
      
    setIsLoading(true);  
    try {  
      const response = await post('/auth/login', {  
        username,  
        password  
      });  
        
      // 登录成功处理  
      if (onLoginSuccess) {  
        onLoginSuccess(response.token);  
      } else {  
        localStorage.setItem('token', response.token);  
        onOpenChange(false);  
        window.location.reload();  
      }  
    } catch (error) {  
      console.error('Login failed:', error);  
    } finally {  
      setIsLoading(false);  
    }  
  };  
  
  return (  
    <Modal   
      isOpen={isOpen}   
      onOpenChange={onOpenChange}  
      placement="center"  
      backdrop="blur"  
    >  
      <ModalContent>  
        {(onClose: () => void) => (  
          <>  
            <ModalHeader className="flex flex-col gap-1">  
              <h2 className="text-xl font-bold">{t('loginWelcome')}</h2>  
              <p className="text-sm text-gray-500">{t('loginTip')}</p>  
            </ModalHeader>  
            <ModalBody>  
              <Input  
                autoFocus  
                label={t('username')}  
                placeholder={t('username')}  
                variant="bordered"  
                value={username}  
                onChange={(e) => setUsername(e.target.value)}  
              />  
              <Input  
                label={t('password')}  
                placeholder={t('password')}  
                type="password"  
                variant="bordered"  
                value={password}  
                onChange={(e) => setPassword(e.target.value)}  
              />  
              {onSwitchToReset && (  
                <div className="flex py-2 px-1 justify-between">  
                  <Link   
                    color="primary"   
                    href="#"   
                    size="sm"  
                    onClick={onSwitchToReset}  
                  >  
                    {t('forgot')}  
                  </Link>  
                </div>  
              )}  
            </ModalBody>  
            <ModalFooter className="flex flex-col gap-2">  
              <Button   
                color="primary"   
                onPress={handleLogin}  
                isLoading={isLoading}  
                className="w-full"  
              >  
                {t('login')}  
              </Button>  
              <Divider />  
              <div className="flex gap-2 justify-center">  
                <span className="text-sm">{t('noAccount')}</span>  
                <Link   
                  size="sm"   
                  onPress={onSwitchToRegister}  
                  className="cursor-pointer"  
                >  
                  {t('signup')}  
                </Link>  
              </div>  
            </ModalFooter>  
          </>  
        )}  
      </ModalContent>  
    </Modal>  
  );  
}