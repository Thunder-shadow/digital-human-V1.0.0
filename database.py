from sqlalchemy import create_engine  
from sqlalchemy.orm import sessionmaker  
from models.user import Base  
import os  
  
# PostgreSQL 连接配置  
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:Qq123456@101.126.22.101:5432/postgres")  
  
engine = create_engine(DATABASE_URL)  
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)  
  
# 创建数据库表  
def create_tables():  
    Base.metadata.create_all(bind=engine)  
  
def get_db():  
    db = SessionLocal()  
    try:  
        yield db  
    finally:  
        db.close()