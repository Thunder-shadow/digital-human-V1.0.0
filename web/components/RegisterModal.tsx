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
  Checkbox,  
  Divider  
} from "@heroui/react";  
import { useTranslations } from 'next-intl';  
import { post } from '@/lib/api/requests';
import TermsModal from './TermsModal';  
  
interface RegisterModalProps {  
  isOpen: boolean;  
  onOpenChange: (open: boolean) => void;  
  onSwitchToLogin: () => void;  
}  
  
export default function RegisterModal({   
  isOpen,   
  onOpenChange,   
  onSwitchToLogin   
}: RegisterModalProps) {  
  const t = useTranslations('Login');  
  const [formData, setFormData] = useState({  
    username: '',
    email: '',  
    password: '',  
    confirmPassword: '',  
    mobileNumber: '' 
  });  
  const [agreedToTerms, setAgreedToTerms] = useState(false);  
  const [isLoading, setIsLoading] = useState(false);
  const [termsModal, setTermsModal] = useState<'terms' | 'privacy' | null>(null);      
  
  const handleRegister = async () => {  
    if (!agreedToTerms) {  
      alert(t('errors.terms'));  
      return;  
    }  
      
    if (formData.password !== formData.confirmPassword) {  
      alert(t('errors.passwd'));  
      return;  
    }  
      
    setIsLoading(true);  
    try {  
      const response = await post('/adh/auth/register', {  
        username: formData.username,  
        password: formData.password,  
        mobile: formData.mobileNumber,
        email: formData.email
      });  
        
      alert(t('registerSuccess'));  
      onSwitchToLogin();  
    } catch (error) {  
      console.error('Register failed:', error);  
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
      size="lg"  
    >  
      <ModalContent>  
        {(onClose: () => void) => (  
          <>  
            <ModalHeader className="flex flex-col gap-1">  
              <h2 className="text-xl font-bold">{t('signupGuide')}</h2>  
              <p className="text-sm text-gray-500">{t('signupTip')}</p>  
            </ModalHeader>  
            <ModalBody>  
              <Input  
                label={t('username')}  
                placeholder={t('username')}  
                variant="bordered"  
                value={formData.username}  
                onChange={(e) => setFormData({...formData, username: e.target.value})}  
              />   
              <Input  
                label="邮箱"  
                placeholder="请输入邮箱"  
                type="email"  
                variant="bordered"  
                value={formData.email}  
                onChange={(e) => setFormData({...formData, email: e.target.value})}  
              /> 
              <Input  
                label={t('password')}  
                placeholder={t('password')}  
                type="password"  
                variant="bordered"  
                value={formData.password}  
                onChange={(e) => setFormData({...formData, password: e.target.value})}  
              />  
              <Input  
                label={t('mobileNumber')}  
                placeholder={t('mobileNumber')}  
                variant="bordered"  
                value={formData.mobileNumber}  
                onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}  
              />
              <Input  
                label={t('confirmPassword')}  
                placeholder={t('confirmPassword')}  
                type="password"  
                variant="bordered"  
                value={formData.confirmPassword}  
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}  
              />  
            <Checkbox   
              isSelected={agreedToTerms}  
              onValueChange={setAgreedToTerms}  
              size="sm"  
            >
              <span className="text-sm">
                {t('agree')}
                <Button
                  variant="light"
                  size="sm"
                  onPress={() => setTermsModal('terms')}
                  className="p-0 h-auto min-w-0"
                >
                  {t('termsOfService')}
                </Button>
                {' '}和{' '}
                <Button
                  variant="light"
                  size="sm"
                  onPress={() => setTermsModal('privacy')}
                  className="p-0 h-auto min-w-0"
                >
                  {t('privacyPolicy')}
                </Button>
              </span>
            </Checkbox>

              {/* 添加TermsModal */}
              <TermsModal
                isOpen={termsModal !== null}
                onOpenChange={(open) => !open && setTermsModal(null)}
                type={termsModal || 'terms'}
              />
            </ModalBody>  
            <ModalFooter className="flex flex-col gap-2">  
              <Button   
                color="primary"   
                onPress={handleRegister}  
                isLoading={isLoading}  
                className="w-full"  
              >  
                {t('register')}  
              </Button>  
              <Divider />  
              <div className="flex gap-2 justify-center">  
                <span className="text-sm">{t('alreadyAccount')}</span>  
                <Link   
                  size="sm"   
                  onPress={onSwitchToLogin}  
                  className="cursor-pointer"  
                >  
                  {t('login')}  
                </Link>  
              </div>  
            </ModalFooter>  
          </>  
        )}  
      </ModalContent>  
    </Modal>  
  );  
}