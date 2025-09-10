from fastapi import APIRouter, Depends, HTTPException, status  
from sqlalchemy.orm import Session  
from pydantic import BaseModel  
from database import get_db  
from models.user import User  
import secrets  
import string 
import os
from datetime import datetime      

  
router = APIRouter(prefix="/auth", tags=["Authentication"])  
  
# 请求模型  
class LoginRequest(BaseModel):  
    username: str  
    password: str  
  
class RegisterRequest(BaseModel):  
    username: str  
    password: str  
    mobile: str  
    email: str  
  
class SendCodeRequest(BaseModel):  
    mobile: str  
  
# 响应模型  
class AuthResponse(BaseModel):  
    token: str  
    message: str  
  
# 简单的验证码存储（生产环境建议使用Redis）  
verification_codes = {}  
  
def generate_token():  
    """生成简单的token"""  
    return ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(32))  
  
@router.post("/register", response_model=AuthResponse)  
async def register(request: RegisterRequest, db: Session = Depends(get_db)):  
      
    # 检查用户名是否已存在  
    if db.query(User).filter(User.username == request.username).first():  
        raise HTTPException(  
            status_code=status.HTTP_400_BAD_REQUEST,  
            detail="用户名已存在"  
        )  
      
    # 检查手机号是否已存在  
    if db.query(User).filter(User.mobile == request.mobile).first():  
        raise HTTPException(  
            status_code=status.HTTP_400_BAD_REQUEST,  
            detail="手机号已注册"  
        )  

    # 检查邮箱是否已存在（新增）  
    if db.query(User).filter(User.email == request.email).first():  
        raise HTTPException(  
            status_code=status.HTTP_400_BAD_REQUEST,  
            detail="邮箱已注册"  
        ) 
      
    # 创建新用户  
    user = User(  
        username=request.username,  
        mobile=request.mobile,
        email=request.email,
        created_at=datetime.utcnow()
    )  
    user.set_password(request.password)  
      
    db.add(user)  
    db.commit()  
    db.refresh(user)    
      
    return AuthResponse(  
        token=generate_token(),  
        message="注册成功"  
    )  
  
@router.post("/login", response_model=AuthResponse)  
async def login(request: LoginRequest, db: Session = Depends(get_db)):  
    # 查找用户  
    user = db.query(User).filter(User.username == request.username).first()  
      
    if not user or not user.check_password(request.password):  
        raise HTTPException(  
            status_code=status.HTTP_401_UNAUTHORIZED,  
            detail="用户名或密码错误"  
        )  
      
    return AuthResponse(  
        token=generate_token(),  
        message="登录成功"  
    )  
  
@router.post("/send-code")  
async def send_code(request: SendCodeRequest):  
    # 生成6位验证码  
    code = ''.join(secrets.choice(string.digits) for _ in range(6))  
      
    # 存储验证码（实际项目中应该设置过期时间）  
    verification_codes[request.mobile] = code  
      
    # 这里应该调用短信服务发送验证码  
    # 为了演示，我们直接返回验证码  
    print(f"验证码发送到 {request.mobile}: {code}")  
      
    return {"message": "验证码已发送", "code": code}  # 生产环境不应返回验证码  
  
@router.post("/logout")  
async def logout():  
    return {"message": "登出成功"}  
  
@router.post("/refresh")  
async def refresh_token():  
    return {"token": generate_token()}