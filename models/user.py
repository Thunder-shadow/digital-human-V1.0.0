from sqlalchemy import Column, Integer, String, DateTime, create_engine  
from sqlalchemy.ext.declarative import declarative_base  
from sqlalchemy.orm import sessionmaker  
from datetime import datetime  
import hashlib  
  
Base = declarative_base()  
  
class User(Base):  
    __tablename__ = "users"  
      
    id = Column(Integer, primary_key=True, index=True)  
    username = Column(String(50), unique=True, index=True, nullable=False)  
    email = Column(String(100), unique=True, index=True, nullable=True)  
    password_hash = Column(String(255), nullable=False)  
    mobile = Column(String(20), unique=True, index=True, nullable=False)  
    created_at = Column(DateTime, default=datetime.utcnow)  
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)  
      
    def set_password(self, password: str):  
        """设置密码哈希"""  
        self.password_hash = hashlib.sha256(password.encode()).hexdigest()  
      
    def check_password(self, password: str) -> bool:  
        """验证密码"""  
        return self.password_hash == hashlib.sha256(password.encode()).hexdigest()