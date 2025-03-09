from sqlalchemy import String, Integer
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy.types import Uuid

import uuid

class Base(DeclarativeBase):
    pass

class Entity(Base):
    __tablename__ = "entity"

    id: Mapped[uuid.uuid4] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(64), nullable=False)