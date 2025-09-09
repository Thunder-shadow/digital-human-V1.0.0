import React from 'react';  
import {  
  Modal,  
  ModalContent,  
  ModalHeader,  
  ModalBody,  
  ModalFooter,  
  Button  
} from "@heroui/react";  
  
interface TermsModalProps {  
  isOpen: boolean;  
  onOpenChange: (open: boolean) => void;  
  type: 'terms' | 'privacy';  
}  
  
export default function TermsModal({ isOpen, onOpenChange, type }: TermsModalProps) {  
  const title = type === 'terms' ? '服务协议' : '隐私政策';  
  const content = type === 'terms' ?   
    '这里是服务协议的具体内容...' :   
    '这里是隐私政策的具体内容...';  
  
  return (  
    <Modal   
      isOpen={isOpen}   
      onOpenChange={onOpenChange}  
      placement="center"  
      backdrop="blur"  
      size="lg"  
    >  
      <ModalContent>  
        {(onClose) => (  
          <>  
            <ModalHeader>{title}</ModalHeader>  
            <ModalBody>  
              <div className="text-sm text-gray-700">  
                {content}  
              </div>  
            </ModalBody>  
            <ModalFooter>  
              <Button color="primary" onPress={onClose}>  
                确定  
              </Button>  
            </ModalFooter>  
          </>  
        )}  
      </ModalContent>  
    </Modal>  
  );  
}