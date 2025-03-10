from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from typing import Annotated
from fastapi import Depends

engine = create_engine("postgresql://postgres:postgres@localhost:5432/fullstack", echo=False)

def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]